import { DeleteMessageMenu } from "@/menus/DeleteMessageMenu";
import Context from "@/models/Context"
import { ethers } from "ethers";
import { WelcomeUser } from "./WelcomeUser";


export async function generateWallet(ctx: Context) {

  console.log('Calling Generate Wallet Menu');

  if (ctx.dbuser && ctx.dbuser.pkey !== '') {

    WelcomeUser(ctx);


  } else {

    const wallet = ethers.Wallet.createRandom();

    ctx.dbuser.pkey = wallet.privateKey;
    ctx.dbuser.address = wallet.address;
    ctx.dbuser.seed = wallet.mnemonic.phrase;
    ctx.dbuser.onst = true;
    ctx.dbuser.save()
    return ctx.reply(`💼 Generated new wallet:

     Address: 
     ${ctx.dbuser.address}
     
     Private Key:
     ${ctx.dbuser.pkey}
     
     Seed:
     ${ctx.dbuser.seed}
     
     ⚠️ Make sure to save this seed phrase or private key using pen and paper only. Do NOT copy-paste it anywhere. You could also import it to your Metamask/Trust Wallet. After you finish saving/importing the wallet credentials, delete this message. The bot will not display this information again.`
      , {
        parse_mode: 'HTML',
        reply_markup: DeleteMessageMenu,
      })
  }

}


