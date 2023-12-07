import { CloseMenu } from '@/menus/CloseMenu';
import { StartScreenMenu } from '@/menus/StartScreenMenus';
import Context from '@/models/Context';
import { Message } from 'grammy/types';

export function Inscriptions(ctx: Context): Promise<Message> {

    return ctx.reply(`<strong>🏄‍♂️ My inscriptions:</strong>

    ➡️  <strong>No Inscriptions Created by you....</strong>

    `, {
        reply_markup: CloseMenu, parse_mode: 'HTML',
        disable_web_page_preview: true
    });

}
