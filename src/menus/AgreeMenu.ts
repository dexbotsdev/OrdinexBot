import { TermsScreen } from '@/handlers/TermsScreen';
import Context from '@/models/Context'
import { Menu } from "@grammyjs/menu";


export const AgreeMenu: any = new Menu<Context>("AgreeMenu")
  .text("✅ I Agree", (ctx) => ctx.deleteMessage());

