import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DbService } from 'src/shared';
import { addTokenDto } from './dto/addToken.dto';
import { createWatchListDto } from './dto/createWatchList.dto';
import { deleteTokenDto } from './dto/deleteToken.dto';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
    constructor(private watchListService: WatchlistService, private dbService: DbService) {

    }

    @Get('coins') // 2.1
    async getMasterListOfTokens() {
        return {
            coins: await this.watchListService.getMasterListOfTokens(),
        }
    }

    @Post('create') //2.2 // HAVE TO DO FORM VALIDATION FOR THE MENTIONED CONTRAINTS
    async createWatchListWithAName(@Body() dto: createWatchListDto) {
        return await this.watchListService.createWatchListWithAName(dto);
    }

    // http://localhost:3000/watchlist/{watchlist-id-here}/add
    @Patch(':id/add') // 2.3
    async addTokenToWatchList(@Param() id: { id: string }, @Body() dto: addTokenDto) {
        return this.watchListService.addTokensToWatchList(id, dto);
    }

    // http://localhost:3000/watchlist/{watchlist-id-here}/delete
    @Patch(':id/delete') //2.4 
    async deleteTokensFromWatchList(@Param() id: { id: string }, @Body() dto: deleteTokenDto) {
        return this.watchListService.deleteTokensFromWatchList(id, dto);
    }

    @Get(':id') // 2.5
    async getWatchListById(@Param('id') id: string) {
        const listOfWatchLists = await this.watchListService.getWatchListById();
        return listOfWatchLists.filter(watchList => {
            return watchList._id == id;
        })[0];
    }

    @Delete(':id') // 2.6
    async deleteWatchListById(@Param('id') id: { id: string }) {
        return this.watchListService.deleteWatchListById(id);
    }
}
