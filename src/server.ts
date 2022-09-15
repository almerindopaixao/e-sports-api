import * as bodyParser from 'body-parser';
import cors from 'cors';

import { Server } from "@overnightjs/core";
import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';

import { GameController } from './controllers/game.controller';
import { AdController } from './controllers/ad.controller';

import { GameRepository } from './repositories/game.repository';
import { AdRepository } from './repositories/ad.repository';



export class SetupServer extends Server {
    constructor(private port = 3000) {
        super();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());

        this.setupRepositories();
        this.setupController();
    }

    public setupController(): void {
        const gameController = container.resolve(GameController);
        const adController = container.resolve(AdController);

        this.addControllers([gameController, adController]);
    }

    public setupRepositories(): void {
        // Rergister Database
        container.register<PrismaClient>('Database', {
            useValue: new PrismaClient({
                log: ['query']
            })
        });

        // Register Repositories
        container.registerSingleton<GameRepository>('GameRepository', GameRepository);
        container.registerSingleton<AdRepository>('AdRepository', AdRepository);
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server listening on: http://localhost:${this.port}`);
        });
    }
}