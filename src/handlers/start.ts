import Context from '@/models/Context'
import { WelcomeUser } from './WelcomeUser';
import { GreetingsNewUser } from './GreetingsNewUser';

export default function startBot(ctx: Context) {

    console.log(ctx.update.message?.from);

    if (!ctx.dbuser.username) {
        ctx.dbuser.username = ctx.update.message?.from.username ? ctx.update.message?.from.username : ctx.update.message?.from.first_name;
        ctx.dbuser.save()
    }

    if (ctx.dbuser.pkey !== '') {
        return WelcomeUser(ctx)
    }
    else {
        return GreetingsNewUser(ctx);
    }

}


