import { captureStarHandle } from "@/handlers/CaptureStarTag";
import Context from '@/models/Context'
import { Menu } from "@grammyjs/menu";
import { PortfolioDisplay } from "@/handlers/PortfolioDisplay";
import { BackMainMenu } from "./BackMainMenu";
import { captureMaxGasPrice, captureMaxLimit } from "@/handlers/SettingsScreen";


export const SettingsMenu = new Menu<Context>("SettingsMenu")
  .text("⛽️ Max Gas Price", (ctx) => captureMaxGasPrice(ctx))
  .text("💧️ Max Gas Limit", (ctx) => captureMaxLimit(ctx)).row()
  .append(BackMainMenu);


