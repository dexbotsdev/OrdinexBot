import { captureStarHandle } from "@/handlers/CaptureStarTag";
import Context from '@/models/Context'
import { Menu } from "@grammyjs/menu";
import { PortfolioDisplay } from "@/handlers/PortfolioDisplay";
import { BackMainMenu } from "./BackMainMenu";
import { TradeHandlerModule } from "@/handlers/TradeHandlerModule";
import { TradeType } from "@/chainutils/chainutils";


export const Snipermenu = new Menu<Context>("Snipermenu")
  .text("🟢 Buy 1 Key", (ctx) => TradeHandlerModule(ctx, 1, TradeType.BUY))
  .text("🔴 Sell 1 Key", (ctx) => TradeHandlerModule(ctx, 1, TradeType.SELL)).row()
  .text("🟢 Buy 3 Key", (ctx) => TradeHandlerModule(ctx, 3, TradeType.BUY))
  .text("🔴 Sell 3 Key", (ctx) => TradeHandlerModule(ctx, 3, TradeType.SELL)).row()
  .text("🟢 Buy 5 Key", (ctx) => TradeHandlerModule(ctx, 5, TradeType.BUY))
  .text("🔴 Sell 5 Key", (ctx) => TradeHandlerModule(ctx, 5, TradeType.SELL)).row()
  .text("🟢 Buy 10 Key", (ctx) => TradeHandlerModule(ctx, 10, TradeType.BUY))
  .text("🔴 Sell 10 Key", (ctx) => TradeHandlerModule(ctx, 10, TradeType.SELL)).row()
  .text("🟢 MaxWallet Buy", (ctx) => TradeHandlerModule(ctx, 99999999999999, TradeType.BUY))
  .text("🔴 MaxKeys Sell", (ctx) => TradeHandlerModule(ctx, 99999999999999, TradeType.SELL)).row()
  .append(BackMainMenu);


  