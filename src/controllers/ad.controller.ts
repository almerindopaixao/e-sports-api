import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { AdRepository } from '../repositories/ad.repository';



@injectable()
@Controller('ads')
export class AdController {
    constructor(
        @inject('AdRepository')
        private readonly adRepository: AdRepository
    ) {}
    
    @Get(':id/discord')
    public async getDiscordById(req: Request<{ id: string }>, res: Response) {
        const adId = req.params.id;

        const ad = await this.adRepository.findUniqueBy(adId);
        return res.send(ad);
    }
}