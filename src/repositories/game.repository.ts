import { Game, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";


@injectable()
export class GameRepository {
    constructor(
        @inject('Database')
        private readonly database: PrismaClient
    ) {}

    public async findAll(): Promise<Game[]> {
        return this.database.game.findMany({
            include: {
                _count: {
                    select: {
                        ads: true,
                    }
                }
            }
        });
    }
}