import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PipedriveToken, PipedriveTokenDocument } from './entities/pipedrive.entity';

@Injectable()
export class PipedriveService {
  constructor(
    @InjectModel(PipedriveToken.name)
    private readonly pipedriveTokenModel: Model<PipedriveTokenDocument>,
  ) {}

  // Guarda o actualiza el API Key
  async saveApiKey(apiToken: string): Promise<PipedriveToken> {
    const existing = await this.pipedriveTokenModel.findOne();
    if (existing) {
      existing.apiToken = apiToken;
      return existing.save();
    }
    return this.pipedriveTokenModel.create({ apiToken });
  }

  // Obtiene el API Key
  async getApiKey(): Promise<string | null> {
    const tokenDoc = await this.pipedriveTokenModel.findOne();
    return tokenDoc?.apiToken ?? null;
  }

}
