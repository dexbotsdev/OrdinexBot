import Context from "@/models/Context";
import { Menu } from "@grammyjs/menu";


export const DeleteMessageMenu = new Menu<Context>("DeleteMessageMenu")
  .text("🧨 Delete this Message after noting the details", (ctx) => {

    console.log(ctx)

    const a = Number(ctx.update.callback_query.message?.message_id);
    const c = Number(ctx.chat?.id);

    ctx.api.deleteMessage(c, a);


  })

