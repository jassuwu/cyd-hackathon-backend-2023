import { DbService } from './db.service';
/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [DbService],
  exports: [DbService],
})
export class SharedModule { }
