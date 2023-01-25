import { Injectable } from '@nestjs/common';

@Injectable()
export class BalanceService {
    async getBalance(chainId: number, address: string) {
        const result = await fetch(`https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=ckey_d64baa7fc7db4fc68afbf0f23f8`)
        return result.json();
    }
}
