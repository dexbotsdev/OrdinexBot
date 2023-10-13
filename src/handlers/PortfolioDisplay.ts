import Context from "@/models/Context"
import { ethers } from "ethers";
import { WelcomeUser } from "./WelcomeUser";
import { avaxProvider } from "@/chainutils/chainutils";
import { BackMainMenu } from "@/menus/BackMainMenu";
import { findMyTrades } from "@/models/Trades";


export async function PortfolioDisplay(ctx: Context) {

  console.log('Calling PortfolioDisplay Menu');

  if (ctx.dbuser.pkey !== '') {

    const data = await findMyTrades(ctx.dbuser.address);

    console.log(data);

    let result = `
    My Trades | Amount of Shares 
    `;

    for (var i = 0; i < data.length; i++) {
      result += `${data[i].subject} |  ${data[i].amnt} Shares 
      `;


    }

    return ctx.reply(`💼 Your Portfolio is   ` + result, {
      parse_mode: 'HTML',
      reply_markup: BackMainMenu,
    })
  }

}


