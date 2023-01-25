import { Controller, Get, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
    constructor(private balanceService: BalanceService) {

    }

    @Get(':address')
    async getBalances(@Param('address') address: string) {
        const finalResult = {
            address: address,
            balances: {
                eth: {},
                polygon: {},
                fantom: {},
            },
            totalBalanceInUSD: 0,
        };
        const res = await this.balanceService.getBalance(1, address);
        const listOfItems = res.data.items;
        let intermediateResult = listOfItems.map(item => {
            return {

                name: item.contract_name,
                symbol: item.contract_ticker_symbol,
                decimals: item.contract_decimals,
                contractAddress: item.contract_address,
                contractDecimals: item.contract_decimals,
                logo: item.logo_url,
                balance: item.balance,
                balanceInUSD: Number(item.balance), // Have to know the formula to calc

            }
        });
        intermediateResult = intermediateResult.filter(result => result.symbol === "ETH");
        finalResult.balances.eth = intermediateResult[0];
        finalResult.totalBalanceInUSD += intermediateResult[0].balanceInUSD;

        const res2 = await this.balanceService.getBalance(137, address);
        const listOfItems2 = res2.data.items;
        intermediateResult = listOfItems2.map(item => {
            return {

                name: item.contract_name,
                symbol: item.contract_ticker_symbol,
                decimals: item.contract_decimals,
                contractAddress: item.contract_address,
                contractDecimals: item.contract_decimals,
                logo: item.logo_url,
                balance: item.balance,
                balanceInUSD: Number(item.balance), // Have to know the formula to calc

            }
        });
        intermediateResult = intermediateResult.filter(result => result.symbol === "MATIC");
        finalResult.balances.polygon = intermediateResult[0];
        finalResult.totalBalanceInUSD += intermediateResult[0].balanceInUSD;

        // FANTOM
        const res3 = await this.balanceService.getBalance(250, address);
        const listOfItems3 = res3.data.items;
        intermediateResult = listOfItems3.map(item => {
            return {

                name: item.contract_name,
                symbol: item.contract_ticker_symbol,
                decimals: item.contract_decimals,
                contractAddress: item.contract_address,
                contractDecimals: item.contract_decimals,
                logo: item.logo_url,
                balance: item.balance,
                balanceInUSD: Number(item.balance), // Have to know the formula to calc

            }
        });
        intermediateResult = intermediateResult.filter(result => result.symbol === "FTM");
        finalResult.balances.fantom = intermediateResult[0];
        finalResult.totalBalanceInUSD += intermediateResult[0].balanceInUSD;

        // The final result's totalBalanceInUSD is incorrect. Need formula to calc.
        return finalResult;

    }
}
