import { SharedModule } from './shared';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './balance/balance.module';
import { WatchlistModule } from './watchlist/watchlist.module';

@Module({
  imports: [SharedModule, BalanceModule, WatchlistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
