import { Controller, Get, Post } from '@overnightjs/core'
import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { CreateAdDTO } from '../dtos/create-ad.dto';
import { GameRepository } from '../repositories/game.repository';
import { AdRepository } from '../repositories/ad.repository';
import { AdHelper } from '../helpers/ad.helper';


@injectable()
@Controller('games')
export class GameController {
    constructor(
        @inject('GameRepository')
        private readonly gameRepository: GameRepository,

        @inject('AdRepository')
        private readonly adRepository: AdRepository
    ) {}

    @Get('')
    public async listGames(_: Request, res: Response) {
        const games = await this.gameRepository.findAll();
        return res.send(games);
    }

    @Get(':id/ads')
    public async listAdsByGame(req: Request<{ id: string }>, res: Response) {
        const gameId = req.params.id;
        const responseAd = await this.adRepository.findBy(gameId);

        return res.send(
            responseAd.map(
                (ad) => ({ 
                    ...ad, 
                    weekDays: ad.weekDays.split(','),
                    hourStart: AdHelper.convertMinutesToHourString(ad.hourStart),
                    hourEnd: AdHelper.convertMinutesToHourString(ad.hourEnd),
                })
            )
        );
    }

    @Post(':id/ads')
    public async createAd(req: Request<{ id: string }, any, CreateAdDTO>, res: Response) {
        const gameId = req.params.id;
        const adPayload = req.body;

        const ad = await this.adRepository.create({ gameId, ...adPayload });

        return res.status(201).send(ad);
    }
}