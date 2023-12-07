import { StartScreenMenu } from '@/menus/StartScreenMenus';
import Context from '@/models/Context';
import { Message } from 'grammy/types';
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { HdKeyring } from '@unisat/bitcoin-hd-keyring';
import { CloseMenu } from '@/menus/CloseMenu';

export interface WalletCore {
    encryptedSeed: string;
    taprootAddress: string;
    publicKey: string;
    network?: "main" | "testnet";
}

export interface UtxoInfo {
    status: {
        confirmed: boolean;
        block_height: number;
        block_hash: string;
        block_time: number;
    };
    txid: string;
    vout: number;
    value: number;
}

export async function GenerateWallet(ctx: Context): Promise<Message.TextMessage> {

    const m = generateMnemonic(128);
    console.log(m);
    const terms = m.split(' ');
    const password = terms[terms.length - 1];

    const keyring = new HdKeyring();
    await keyring.deserialize({
        mnemonic: m,
        activeIndexes: [0, 1],
    });

    const accounts = await keyring.getAccounts();
    const privateKey = await keyring.exportAccount(accounts[0]);
    const address = keyring.getAddresses(0, 1);
    console.log(address);

    ctx.dbuser.pkey = privateKey;
    ctx.dbuser.seed = m;
    ctx.dbuser.address = address[0].address;
    await ctx.dbuser.save();

    console.log(ctx.dbuser);


    return ctx.reply(`🎯 <strong>New Wallet Generated For: </strong>  ${ctx.dbuser.username}
  
    Mnemonic: ${m}

    PrivateKey: ${privateKey}

    Address : ${address[0].address}


    
    <strong>Note: The Old wallet if any exists has been overwritten</strong>
    `,
        {
            parse_mode: 'HTML', disable_web_page_preview: true,
            reply_markup: CloseMenu
        },);
}
