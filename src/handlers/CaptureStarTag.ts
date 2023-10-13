import { DeleteMessageMenu } from "@/menus/DeleteMessageMenu";
import Context from "@/models/Context"
import { ethers } from "ethers";
import { WelcomeUser } from "./WelcomeUser";
import { StatelessQuestion } from '@grammyjs/stateless-question';
import { Sniper } from "./Sniper";


export const CaptureTagQuestion = new StatelessQuestion('CaptureTag', (ctx: Context) => {
    console.log('CaptureTagQuestion doing:', ctx.message?.text)


    try {
        if (ctx.message?.text && ethers.utils.getAddress(ctx.message?.text.split('x')[1]) === ctx.message.text)
            ctx.dbuser.stKey = ctx.message.text;
        ctx.dbuser.save();
        Sniper(ctx);
    } catch (error) {
        ctx.reply('Invalid Address Entered ');


    }

})

export async function captureStarHandle(ctx: Context) {
    console.log('Calling captureStarHandle');
    return CaptureTagQuestion.replyWithMarkdownV2(ctx, '⬇️ Enter Key or Address to Snipe :‌ ')
}


