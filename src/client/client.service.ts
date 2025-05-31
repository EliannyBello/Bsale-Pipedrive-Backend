import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './entities/client.entity';
import { BsaleService } from '../shared/bsale/bsale.service';
import axios from 'axios';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private readonly bsaleService: BsaleService,
  ) {}

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
}
