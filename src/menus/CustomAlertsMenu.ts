import { captureStarHandle } from "@/handlers/CaptureStarTag";
import { CustomAlerts, minScoreHandle, minTwitterFollowersHandle } from "@/handlers/CustomAlerts";
import Context from '@/models/Context'
import { Menu } from "@grammyjs/menu";
import { ProfileScreenMenu } from "./ProfileScreenMenu";


export const CustomAlertsMenu = new Menu<Context>("CustomAlertsMenu")
    .text((ctx) => `${ctx.dbuser.alerts === true ? '🟢 Alerts Status: Enabled' : '🔴 Alerts : Disabled'}`, async (ctx) => {

        ctx.dbuser.alerts = !ctx.dbuser.alerts
        console.log(ctx.dbuser);
        ctx.dbuser.save()
        await ctx.menu.update({ immediate: true })
    }).row()
    .text((ctx) => `📊 Minimum Twitter Score: ${ctx.dbuser.minscore}`, (ctx) => minScoreHandle(ctx)).row()
    .text((ctx) => `👤 Minimum Followers: ${ctx.dbuser.mintwitter}`, (ctx) => minTwitterFollowersHandle(ctx)).row()
    .back("👈🏻 Back")


