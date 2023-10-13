import { CustomAlertsMenu } from '@/menus/CustomAlertsMenu';
import { StartScreenMenu } from '@/menus/StartScreenMenus';
import Context from '@/models/Context';
import { StatelessQuestion } from '@grammyjs/stateless-question';
import { Menu } from '@grammyjs/menu';


export const MinScoreQuestion = new StatelessQuestion('minscore', (ctx: Context) => {
    console.log('User thinks unicorns are doing:', ctx.message?.text)

    ctx.dbuser.minscore = Number(ctx.message?.text);
    ctx.dbuser.save();

    ctx.reply(`🔔 Custom Stars Arena Alerts

    Set up your own filters to get a notification when user with specific amount of followers or Twitter score joins Stars Arena.
    
    ${ctx.dbuser.alerts === true ? '🟢 Alerts Status: Enabled' : '🔴 Alerts : Disabled'}
    📊 Minimum Twitter Score: ${ctx.dbuser.minscore}
    👤 Minimum Followers: ${ctx.dbuser.mintwitter}`,
        {
            parse_mode: "HTML", disable_web_page_preview: true,
            reply_markup: CustomAlertsMenu
        },);
})

export async function minScoreHandle(ctx: Context) {
    console.log('Calling minScoreHandle');
    return MinScoreQuestion.replyWithMarkdownV2(ctx, '📊 Enter Minimum Twitter Score:‌ ')
}


export const minTwitterFollowersQuestion = new StatelessQuestion('minTwitter', (ctx: Context) => {
    console.log('User thinks unicorns are doing:', ctx.message?.text)

    ctx.dbuser.mintwitter = Number(ctx.message?.text);
    ctx.dbuser.save();
    ctx.reply(`🔔 Custom Stars Arena Alerts

    Set up your own filters to get a notification when user with specific amount of followers or Twitter score joins Stars Arena.
    
    ${ctx.dbuser.alerts === true ? '🟢 Alerts Status: Enabled' : '🔴 Alerts : Disabled'}
    📊 Minimum Twitter Score: ${ctx.dbuser.minscore}
    👤 Minimum Followers: ${ctx.dbuser.mintwitter}`,
        {
            parse_mode: "HTML", disable_web_page_preview: true,
            reply_markup: CustomAlertsMenu
        },);
})

export async function minTwitterFollowersHandle(ctx: Context) {
    console.log('Calling minTwitterFollowers');
    return minTwitterFollowersQuestion.replyWithMarkdownV2(ctx, '👤 Enter Minimum Followers:‌ ')
}

export function CustomAlerts(ctx: Context) {
    return ctx.reply(`🔔 Custom Stars Arena Alerts

    Set up your own filters to get a notification when user with specific amount of followers or Twitter score joins Stars Arena.
    
    ${ctx.dbuser.alerts === true ? '🟢 Alerts Status: Enabled' : '🔴 Alerts : Disabled'}
    📊 Minimum Twitter Score: ${ctx.dbuser.minscore}
    👤 Minimum Followers: ${ctx.dbuser.mintwitter}`,
        {
            parse_mode: "HTML", disable_web_page_preview: true,
            reply_markup: CustomAlertsMenu
        },);
}
