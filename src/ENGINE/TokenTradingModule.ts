import { avaxProvider, ethProvider, testProvider } from "@/chainutils/chainutils";
import env from "@/helpers/env";
import { ethers } from "ethers";
import { Friend__factory } from '../types/ethers-contracts/factories/Friend__factory';


const curreng = env.ENV;
const provider = curreng == 'dev' ? testProvider : avaxProvider;

const contract = Friend__factory.connect(env.STVAULT, provider);


export const wallet = (privateKey: string) => {
    return new ethers.Wallet(privateKey, provider);
};

/**
 * 
 * 1. Get Wallet Address
 * 2. Check Wallet Balance -- Throw Error if no
 * 3. Contract - PreLoad
 * 4. Call Contract method.
 * 5. Try for 3 Times.
 * 6. Check balance and return true.
 */

export const tradeBuyShares = async (tradingSubject: string, sharesCount: number, privateKey: string) => {


    const price = await contract.getBuyPriceAfterFee(tradingSubject, 1);

    try {

        const userwallet = wallet(privateKey);
        const tx = await contract.connect(userwallet).buyShares(tradingSubject, sharesCount, {
            value: price
        });

        const receipt = await tx.wait();

        if (receipt.status == 1) {

            return `[BUY]success: ${tradingSubject} @ ${ethers.utils.formatEther(price)}`

        } else {
            return `[BUY]failed: ${tradingSubject} @ ${ethers.utils.formatEther(price)}, tx failed`;
        }
    } catch (error) {
        // log error 
        return `[BUY]failed: ${tradingSubject} @ ${ethers.utils.formatEther(price)}, error: ${error}`;
    }



}

export const tradeSellShares = async (tradingSubject: string, sharesCount: number, privateKey: string) => {


    const price = await contract.getBuyPriceAfterFee(tradingSubject, 1);

    try {

        const userwallet = wallet(privateKey);
        const tx = await contract.connect(userwallet).sellShares(tradingSubject, sharesCount);

        const receipt = await tx.wait();

        if (receipt.status == 1) {

            return `[SELL]success: ${tradingSubject} @ ${ethers.utils.formatEther(price)}`

        } else {
            return `[SELL]failed: ${tradingSubject} @ ${ethers.utils.formatEther(price)}, tx failed`;
        }
    } catch (error) {
        // log error 
        return `[SELL]failed: ${tradingSubject} @ ${ethers.utils.formatEther(price)}, error: ${error}`;
    }



}