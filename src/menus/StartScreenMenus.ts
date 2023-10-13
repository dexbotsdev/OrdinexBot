import { generateWallet } from "@/handlers/GenerateWallet";
import Context from '@/models/Context'
import { Menu } from "@grammyjs/menu";


export const StartScreenMenu = new Menu<Context>("StartScreenMenu")
  .text("🖨 Generate Wallet", (ctx) => generateWallet(ctx))
  .text("🔌 Import Wallet", (ctx) => ctx.reply("Disabled For Security Reasons")).row()

