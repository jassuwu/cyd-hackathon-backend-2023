
class item {
    contract_decimals: number;
    contract_name: string
    contract_ticker_symbol: string;
    contract_address: string;
    logo_url: string;
    balance: string;
    quote: number;
}

export class balanceDto {
    data: {
        items: Array<item>
    }
}