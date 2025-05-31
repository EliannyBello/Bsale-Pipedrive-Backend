import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BsaleToken, BsaleTokenDocument } from './entities/bsale.entity';

@Injectable()
export class BsaleService {
  constructor(
    @InjectModel(BsaleToken.name)
    private readonly bsaleTokenModel: Model<BsaleTokenDocument>,
  ) {}

  // Guarda o actualiza el token
  async saveToken(accessToken: string): Promise<BsaleToken> {
    // Solo guarda uno, actualiza si ya existe
    const existing = await this.bsaleTokenModel.findOne();
    if (existing) {
      existing.accessToken = accessToken;
      return existing.save();
    }
    return this.bsaleTokenModel.create({ accessToken });
  }



  // Devuelve el token y la url de Bsale
  async getBsaleConfig(): Promise<{ accessToken: string; urlBsale: string } | null> {
    const tokenDoc = await this.bsaleTokenModel.findOne();
    if (!tokenDoc) return null;
    return {
      accessToken: tokenDoc.accessToken,
      urlBsale: tokenDoc.urlBsale,
    };
  }
}
