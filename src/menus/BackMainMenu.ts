import { WelcomeUser } from '@/handlers/WelcomeUser';
import Context from '@/models/Context';

import { Menu } from "@grammyjs/menu";


export const BackMainMenu = new Menu<Context>("BackMainMenu")
    .text("👈🏻 Close Menu", (ctx) => {
        console.log(ctx)
        const a = Number(ctx.update.callback_query.message?.message_id);
        const c = Number(ctx.chat?.id);
        ctx.api.deleteMessage(c, a);

    })

