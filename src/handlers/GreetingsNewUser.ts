import { StartScreenMenu } from '@/menus/StartScreenMenus';
import Context from '@/models/Context';
import { Message } from 'grammy/types';

export function GreetingsNewUser(ctx: Context): Promise<Message> {

    return ctx.replyWithPhoto('https://www.cryptotimes.io/wp-content/uploads/2023/03/Bitcoin_ordinals-1.jpg', {
        caption: `🎯 Welcome to the OrdiNextBot   ${ctx.dbuser.username}
  
Introducing OrdiNextBot, the easy and fastest way to generate inscription orders from anywhere, 
pay with Lightning or onchain Bitcoin and receive the inscriptions to the provided address,

This is the official OrdiNextBot 🤖 developed by @OrdiNextBotPortal.
Official Website: https://OrdiNext.pro/
I will help you explore the BRC-20 blockchain! 🔎

[Commands]:
  
⭐️ /start - Commands

💵 /fee {file size bytes} {tip in sats} - Check fees

🛒 /create - Create an inscription

📄 /inscriptions - List your inscriptions

🔎 /check {orderId} - Check order status

✈️ /deploy {ticker} {supply} {deployerBTCAddress} - Deploy BRC-20 Token

📝 /mint {ticker} {receiverBTCAddress} - Mint BRC-20 Token

🔀 /transfer {ticker} {senderBTCAddress} {receiverBTCAddress} - Transfer BRC-20 Token 🔎

     
    By proceeding to use the bot, you agree to our Terms of Service!
    `,
        reply_markup: StartScreenMenu
    },
    );
}
