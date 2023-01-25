import { Injectable } from '@nestjs/common';
import { DbService } from 'src/shared';
import { addTokenDto } from './dto/addToken.dto';
import { createWatchListDto } from './dto/createWatchList.dto';
import { deleteTokenDto } from './dto/deleteToken.dto';

@Injectable()
export class WatchlistService {
    constructor(private dbService: DbService) { }
    async getMasterListOfTokens() {
        const result = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
        return result.json();
    }


    async createWatchListWithAName(dto: createWatchListDto) {
        return await this.dbService.create(dto.name, []);
    }

    async addTokensToWatchList(id: { id: string }, dto: addTokenDto) {
        return await this.dbService.updateTokensById(id.id, dto.tokensToBeAdded); // A new updateById is written in the dbService, normally it would be written here.
    }

    async deleteTokensFromWatchList(id: { id: string }, dto: deleteTokenDto) {
        return await this.dbService.removeTokensById(id.id, dto.tokensToBeDeleted);
    }

    async getWatchListById() {
        return await this.dbService.findAll(); // Better to make a fn in DbService to get by id, but later.
    }

    async deleteWatchListById(id: { id: string }) {
        return await this.dbService.deleteWatchListById(id.id);
    }
}
