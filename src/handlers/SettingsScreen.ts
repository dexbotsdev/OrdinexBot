import { DeleteMessageMenu } from "@/menus/DeleteMessageMenu";
import Context from "@/models/Context"
import { ethers } from "ethers";
import { WelcomeUser } from "./WelcomeUser";
import { StatelessQuestion } from '@grammyjs/stateless-question';
import { Sniper } from "./Sniper";
import { SettingsMenu } from "@/menus/SettingsMenu";
import { GreetingsNewUser } from "./GreetingsNewUser";


export const MaxGasPriceQuestion = new StatelessQuestion('MaxGasPrice', (ctx: Context) => {
    console.log('MaxGasPriceQuestion doing:', ctx.message?.text)



    if (ctx.message?.text && Number(ctx.message.text) > 25 && Number(ctx.message.text) < 500) {
        ctx.dbuser.maxgas = Number(ctx.message.text);
        ctx.dbuser.save()
    } else
        ctx.reply('🔴  Minimum is 25. Max is 500.');

    SettingsScreen(ctx);
})

export async function captureMaxGasPrice(ctx: Context) {
    console.log('Calling captureMaxGasPrice');
    return MaxGasPriceQuestion.replyWithMarkdownV2(ctx, `Reply to this message with your desired max gas price \\(in gwei\\)\\. 
    👉 Minimum is 25\\. Max is 500\\.`)
}



export const MaxGasLimitQuestion = new StatelessQuestion('MaxGasLimit', (ctx: Context) => {
    console.log('MaxGasLimitQuestion doing:', ctx.message?.text)



    if (ctx.message?.text && Number(ctx.message.text) > 250000 && Number(ctx.message.text) < 1500000) {
        ctx.dbuser.maxlimit = Number(ctx.message.text);
        ctx.dbuser.save();
    } else
        ctx.reply('🔴 Minimum is 250,000. Max is 1,500,000.');
    SettingsScreen(ctx);


})

export async function captureMaxLimit(ctx: Context) {
    console.log('Calling captureMaxLimit');
    return MaxGasLimitQuestion.replyWithMarkdownV2(ctx, `Reply to this message with your desired buy gas limit\\. 
    👉 Minimum is 250,000\\. Max is 1,500,000\\.‌ `)
}


export function SettingsScreen(ctx: Context) {


    if (!ctx.dbuser.pkey) {
        return GreetingsNewUser(ctx)
    }
    else {
        console.log('Calling SettingsScreen Screen');

        const text = `⚙️ Settings

    ⚡️ Slippage: 49%
    ⛽️ Max Gas Price: ${ctx.dbuser.maxgas}
    💧️ Max Gas Limit: ${ctx.dbuser.maxlimit}`;


        ctx.reply(text, {
            parse_mode: "HTML", disable_web_page_preview: true,
            reply_markup: SettingsMenu
        })
    }

}


