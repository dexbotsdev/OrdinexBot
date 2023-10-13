

import { tradeBuyShares, tradeSellShares } from "@/ENGINE/TokenTradingModule"
import { TradeType } from "@/chainutils/chainutils";
import Context from "@/models/Context"
import { Trade, createTrade, updateTrade } from "@/models/Trades";



export async function TradeHandlerModule(ctx: Context, shareCount: number, tradeType: number) {


    if (ctx.dbuser.pkey !== '') {

        if (tradeType === TradeType.BUY) {
            const result = await tradeBuyShares(ctx.dbuser.stKey, shareCount, ctx.dbuser.pkey);
            if (result.includes('[BUY]success:')) {
                const data = await createTrade(ctx.dbuser.address, ctx.dbuser.stKey, shareCount);
                console.log(data);
            }
            ctx.reply(result);

        } else {

            const result = await tradeSellShares(ctx.dbuser.stKey, shareCount, ctx.dbuser.pkey);
            if (result.includes('[SELL]success:')) {
                const data = await updateTrade(ctx.dbuser.address, ctx.dbuser.stKey, shareCount);
                console.log(data);
            }
            ctx.reply(result);

        }


    }

}

