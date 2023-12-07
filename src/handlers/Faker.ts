import { CloseMenu } from '@/menus/CloseMenu';
import { StartScreenMenu } from '@/menus/StartScreenMenus';
import Context from '@/models/Context';
import { Message } from 'grammy/types';

export function Faker(ctx: Context): Promise<Message> {

    return ctx.reply(`Feature will be Live Soon
    `, {
        reply_markup: CloseMenu, parse_mode: 'HTML',
        disable_web_page_preview: true
    });

}
