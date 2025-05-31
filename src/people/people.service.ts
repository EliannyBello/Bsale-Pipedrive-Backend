import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from '../client/entities/client.entity';
import { Person, PersonDocument } from './entities/person.entity';
import { PipedriveService } from '../shared/pipedrive/pipedrive.service';
import axios from 'axios';
import { EnumState } from 'src/common/enums/enums';

@Injectable()
export class PeopleService {
  private readonly logger = new Logger(PeopleService.name);

  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    @InjectModel(Person.name) private personModel: Model<PersonDocument>, 
    private readonly pipedriveService: PipedriveService,
  ) {}

  // Sincroniza personas con Pipedrive
  async syncPeopleWithPipedrive(): Promise<{ created: number; updated: number }> {

    // Obtiene el API key de Pipedrive
    const apiKey = await this.pipedriveService.getApiKey();
    if (!apiKey) throw new Error('No Pipedrive API key found');

    // Obtiene todos los clientes de MongoDB
    const clients = await this.clientModel.find().lean();

    // contador para personas creadas y actualizadas
    let created = 0, updated = 0;

    // para el log de si los clientes tienen datos incompletos
    for (const client of clients) {
      if (!client.email || !client.firstName || !client.lastName) {
        this.logger.warn(`Cliente con datos incompletos: ${JSON.stringify(client)}`);
        continue;
      }

      // Prepara el payload para Pipedrive
      const personPayload = {
        name: `${client.firstName} ${client.lastName}`.trim(),
        email: [{ value: client.email, primary: true, label: 'main' }],
        phone: client.phone ? [{ value: client.phone, primary: true, label: 'mobile' }] : [],
      };

      // Busca si ya existe en la colección people
      const existingPerson = await this.personModel.findOne({ clientId: client.id });

      try {
        if (existingPerson && existingPerson.pipedriveId) {
          // Actualiza en Pipedrive
          const updateUrl = `https://api.pipedrive.com/v1/persons/${existingPerson.pipedriveId}?api_token=${apiKey}`;
          await axios.put(updateUrl, personPayload);
          updated++;

          // Actualiza en Mongo
          await this.personModel.updateOne(
            { clientId: client.id },
            {
              $set: {
                name: personPayload.name,
                email: client.email,
                phone: client.phone,
              },
            }
          );
        } else {
          // Crea en Pipedrive
          const createUrl = `https://api.pipedrive.com/v1/persons?api_token=${apiKey}`;
          const response = await axios.post(createUrl, personPayload);
          created++;

          // Guarda en Mongo
          await this.personModel.findOneAndUpdate(
            { clientId: client.id },
            {
              clientId: client.id,
              pipedriveId: response.data.data?.id,
              name: personPayload.name,
              email: client.email,
              phone: client.phone,
            },
            { upsert: true, new: true }
          );
        }

        // Cambia el status del cliente a COMPLETED después de sincronizar con Pipedrive
        await this.clientModel.updateOne(
          { id: client.id },
          { $set: { status: EnumState.COMPLETED } }
        );

      } catch (error) {
        this.logger.error(`Error al sincronizar persona ${client.email}:`, error.response?.data || error.message);
      }
    }

    return { created, updated };
  }
}
