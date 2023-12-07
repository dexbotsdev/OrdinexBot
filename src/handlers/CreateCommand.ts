import { CloseMenu } from '@/menus/CloseMenu';
import { StartScreenMenu } from '@/menus/StartScreenMenus';
import Context from '@/models/Context';
import { Message } from 'grammy/types';

export function CreateCommand(ctx: Context): Promise<Message> {

    return ctx.reply(`<strong>🏄‍♂️ Create an inscription:</strong>

    ➡️ Send the file you'd like to create an inscription
    
    <strong>Maximum size: 390 KB</strong>
    Accepted formats: jpg, jpeg, png, gif, svg, webm, webp, pdf, txt, mp3, mp4, wav
    <strong>Do Not Check Compression option while Uploading....</strong>

    `, {
        reply_markup: CloseMenu, parse_mode: 'HTML',
        disable_web_page_preview: true
    });

}
