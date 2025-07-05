import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './entities/client.entity';
import { BsaleService } from '../shared/bsale/bsale.service';
import axios from 'axios';
import { PaginationQueryDto, SortOrder } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private readonly bsaleService: BsaleService,
  ) { }

  // Función para obtener clientes de Bsale y guardarlos en la base de datos
  async syncBsaleClients(): Promise<any> {

    const bsaleConfig = await this.bsaleService.getBsaleConfig()
    if (!bsaleConfig) throw new Error('No Bsale access token found');

    const url = bsaleConfig.urlBsale;
    const response = await axios.get(url, {
      headers: {
        access_token: bsaleConfig.accessToken,
        Accept: 'application/json',
      },
    });

    const clients = response.data.items;

    // Filtrar por clientes creados en las últimas 24 horas
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const recentClients = clients.filter(client => {
      if (!client.createdAt) return false;
      const createdAt = new Date(client.createdAt);
      return createdAt >= last24h;
    });

    // Guarda o actualiza cada cliente reciente
    for (const client of recentClients) {
      await this.clientModel.updateOne(
        { id: client.id },
        { $set: client },
        { upsert: true },
      );
    }
    return { count: recentClients.length };

    //para que pueda ejecutarse y no filtre por las ultimas 24h 
    //     for (const client of clients) {
    //   await this.clientModel.updateOne(
    //     { id: client.id },
    //     { $set: client },
    //     { upsert: true },
    //   );
    // }
    // return { count: clients.length };


  }



  async getAllClient(
     query: PaginationQueryDto,
  ): Promise<PaginatedResponse<any>> {
    const {
      limit = 10,
      page = 1,
      sortBy = 'createdAt',
      sortOrder = SortOrder.ASC,
      search,
      from,
      to,
      state,
    } = query;

    const sort: { [key: string]: 1 | -1 } = {
      [sortBy]: sortOrder === SortOrder.ASC ? 1 : -1,
    };
    const filters: { $or?: any[], $and?: any[] } = {};

    if (search && search.length > 0) {
      const searchValue = search.trim();
      filters.$or = [];
      filters.$or.push({
        $expr: {
          $regexMatch: {
            input: { $toString: "$firstName" },
            regex: searchValue,
            options: "i"
          }
        }
      });
      filters.$or.push({
        $expr: {
          $regexMatch: {
            input: { $toString: "$lastName" },
            regex: searchValue,
            options: "i"
          }
        }
      });
    }

    if (from && to) {
      filters.$and = [
        { soldAt: { $gte: new Date(from) } },
        { soldAt: { $lte: new Date(to) } },
      ];
    }

    if (state) {
      const stateFilter = { state: { $regex: `^${state}$`, $options: "i" } };
      filters.$and = filters.$and ? [...filters.$and, stateFilter] : [stateFilter];
    }

    const [items, totalItems] = await Promise.all([
      this.clientModel
        .find(filters)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.clientModel.countDocuments(filters),
    ]);

    return {
      items,
      meta: {
        totalItems,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        hasNextPage: page * limit < totalItems,
        hasPreviousPage: page > 1,
      },
    };
  }
}
