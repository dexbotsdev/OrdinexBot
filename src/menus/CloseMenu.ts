import { TermsScreen } from '@/handlers/TermsScreen';
import Context from '@/models/Context'
import { Menu } from "@grammyjs/menu";


export const CloseMenu: any = new Menu<Context>("CloseMenu")
  .text("✅ I Have Noted", (ctx) => ctx.deleteMessage());

