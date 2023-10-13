import { DeleteMessageMenu } from "@/menus/DeleteMessageMenu";
import Context from "@/models/Context"
import { ethers } from "ethers";
import { WelcomeUser } from "./WelcomeUser";
import { Snipermenu } from "@/menus/SniperMenu";


export function Sniper(ctx: Context) {

    console.log('Calling Sniper Screen');

    const key = 'SearchAPIKEY';
    const address = '0xABCD';

    const text = `🔑 Key: Unknown
  
    💼 Address: 
    0x6C56c32ac90e89ab56EF9055424F210917d05D4a <a href="https://snowtrace.io/address/0x6C56c32ac90e89ab56EF9055424F210917d05D4a">(explorer)</a>
    
    🐦 Twitter: -
    📊 Twitter Score: -
    💸 AVAX Balance: 0.0000
    🖨 Supply: 0
    💰 Buy / Sell Price: 0.0066 / 0.0000
      
    Your keys: 0 keys
    Your AVAX: 0.0000
    Custom Buy/Sell gas: off / off`;


    ctx.reply(text, {
        parse_mode: "HTML", disable_web_page_preview: true,
        reply_markup: Snipermenu
    })

}


