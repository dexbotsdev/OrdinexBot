import Context from '@/models/Context'
import { GreetingsNewUser } from './GreetingsNewUser';

export default function startBot(ctx: Context) {


    if (ctx.dbuser.username === '') {
        ctx.dbuser.username = ctx.update.message?.from.username ? ctx.update.message?.from.username : ctx.update.message?.from.first_name;
        ctx.dbuser.save()
    }

    return GreetingsNewUser(ctx);
}


