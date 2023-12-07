import { CreateCommand } from '@/handlers/CreateCommand';
import { GenerateWallet } from '@/handlers/GenerateWallet';
import { TermsScreen } from '@/handlers/TermsScreen';
import Context from '@/models/Context'
import { Menu } from "@grammyjs/menu";


export const StartScreenMenu: any = new Menu<Context>("StartScreenMenu")
  .text("ℹ️ Terms of Service", (ctx) => TermsScreen(ctx)).row()
  .text("#️⃣ Generate Wallet", (ctx) => GenerateWallet(ctx)).row()
  .text("🔡 Inscribe BRC-20", (ctx) => CreateCommand(ctx)).row()

