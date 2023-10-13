import { ethers } from "ethers";
import env from '@/helpers/env'


export const avaxProvider = new ethers.providers.JsonRpcProvider(env.AVAXRPC);
export const ethProvider = new ethers.providers.JsonRpcProvider(env.ETHRPC);
export const testProvider = new ethers.providers.JsonRpcProvider(env.TESTNETRPC);


export const getAppWalletBalance = async (walletAddress: string | Promise<string>) => {

    const provider = env.ENV === 'dev' ? testProvider : avaxProvider;

    return await provider.getBalance(walletAddress);
}


export const TradeType = {
    BUY: 1,
    SELL: -1
}
