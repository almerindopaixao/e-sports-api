import {  Ad, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { CreateAdDTO } from "../dtos/create-ad.dto";
import { AdHelper } from "../helpers/ad.helper";

@injectable()
export class AdRepository  {
    constructor(
        @inject('Database')
        private readonly database: PrismaClient
    ) {}

    async create(payload: CreateAdDTO & { gameId: string }): Promise<Ad> {
        return this.database.ad.create({
            data: {
                gameId: payload.gameId,
                name: payload.name,
                yearsPlaying: payload.yearsPlaying,
                discord: payload.discord,
                weekDays: payload.weekDays.join(','),
                hourStart: AdHelper.convertHourStringToMinutes(payload.hourStart),
                hourEnd: AdHelper.convertHourStringToMinutes(payload.hourEnd),
                useVoiceChannel: payload.useVoiceChannel
            }
        })
    }

    public async findUniqueBy(adId: string) {
        return this.database.ad.findUniqueOrThrow({
            select: {
                discord: true,
            },
            where: {
                id: adId,
            },
        })
    }

    public async findBy(gameId: string) {
        return this.database.ad.findMany({
            select: {
                id: true,
                name: true,
                weekDays: true,
                useVoiceChannel: true,
                yearsPlaying: true,
                hourStart: true,
                hourEnd: true,
            },
            where: {
                gameId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
}