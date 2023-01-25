/* eslint-disable @typescript-eslint/no-var-requires */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { isUndefined } from 'lodash';
import { uuid } from 'uuidv4';

@Injectable()
export class DbService {
  private WatchLists;
  constructor() {
    const dbLocal = require('db-local');
    const { Schema } = new dbLocal({ path: './databases' });
    this.WatchLists = Schema('WatchLists', {
      _id: { type: String, required: true },
      name: { type: String, default: 'Customer' },
      tokens: { type: Array, default: [] },
    });
  }

  async find(key: string) {
    const reqWList = this.WatchLists.find((obj: any) => {
      obj.name === key;
    });
    return reqWList;
  }

  async findAll() {
    const result = await this.WatchLists.find();
    return result;
  }

  async create(name: string, data: Array<string>) {
    const res = this.WatchLists.create({
      _id: uuid(),
      name: name,
      tokens: data,
    }).save();
    return res;
  }

  async update(key: string, data: Array<string>) {
    const reqWList = this.WatchLists.find((obj: any) => {
      obj.name === key;
    });
    const updatedTokens = reqWList.tokens.concat(data);
    const res = reqWList.update({ tokens: updatedTokens }).save();
    return res;
  }

  async updateTokensById(id: string, data: Array<string>) {
    const watchListFound = this.WatchLists.find({ _id: id })[0];
    if (watchListFound.tokens !== undefined) {
      const newTokens = watchListFound.tokens.concat(data);
      const res = this.WatchLists.update({ _id: id }, { tokens: [...new Set(newTokens)] }).save(); // This new Set with the spread operator will take care of duplicates.
      return res;
    }
    else {
      const res = this.WatchLists.update({ _id: id }, { tokens: data }).save();
      return res;
    }
  }

  async removeTokensById(id: string, data: Array<string>) {
    const watchListFound = this.WatchLists.find({ _id: id })[0];
    if (watchListFound.tokens !== undefined) {
      const newTokens = watchListFound.tokens.filter(token => !data.includes(token));
      const res = this.WatchLists.update({ _id: id }, { tokens: newTokens }).save();
      return res;
    }
    else {
      return watchListFound;
    }
  }

  async deleteWatchListById(id: string) {
    const res = this.WatchLists.remove({ _id: id });
    console.log(res);
    return res;
  }

}
