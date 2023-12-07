import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { run } from '@grammyjs/runner'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import startMongo from '@/helpers/startMongo'
import startBot from './handlers/start'
import { StartScreenMenu } from './menus/StartScreenMenus'
import { AgreeMenu } from './menus/AgreeMenu'
import { GenerateWallet } from './handlers/GenerateWallet'
import fee from './handlers/fee'
import { CloseMenu } from './menus/CloseMenu'
import { CreateCommand } from './handlers/CreateCommand'
// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from 'nft.storage'
import env from './helpers/env'
import axios from 'axios'
import { Inscriptions } from './handlers/Inscriptions'
import { Faker } from './handlers/Faker'

// Paste your NFT.Storage API key into the quotes:

export const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAxQzM4ZGVhN0QwQTcxRkIyY0NGOGIzYzliMWVmMDk3Mjc0MUY2ODYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMTkxNDE5MDY3MCwibmFtZSI6Im9yZGluYW5jZSJ9.DR8xEjrABHIXPV3tBktejuG7br0r672brDF4Fy-fvBY';


async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('Mongo connected')
  bot
    .use(attachUser)
    .use(AgreeMenu)
    .use(CloseMenu)
    .use(StartScreenMenu)



  bot.command('start', startBot)
  bot.command('create', CreateCommand)
  bot.command('fee', fee)
  bot.command('inscriptions', Inscriptions)
  bot.command('check', Faker)
  bot.command('deploy', Faker)
  bot.command('mint', Faker)
  bot.command('transfer', Faker)


  bot.on("message", async (ctx) => {


    console.log(ctx.message)

    if (ctx.message.photo) {
      const photo = ctx.message.photo;
      const fileId = photo[photo.length - 1].file_id;
      const file = await ctx.api.getFile(fileId); // valid for at least 1 hour
      const fileUrl = `https://api.telegram.org/file/bot${env.TOKEN}/${file.file_path}`;
      await GenerateAndSendINS(fileUrl);
    }
    if (ctx.message.document) {
      // Now you can do something with the file, such as download or process it
      const file = await ctx.getFile(); // valid for at least 1 hour
      const fileUrl = `https://api.telegram.org/file/bot${env.TOKEN}/${file.file_path}`;

      // Use fetch or any other method to get the file contents
      await GenerateAndSendINS(fileUrl);
    }

    async function GenerateAndSendINS(fileUrl: string) {
      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' })
      const fileBuffer = Buffer.from(response.data)
      const fileSizeInBytes = fileBuffer.length
      const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
      const imageFile = new File([fileBuffer], 'nft.png', { type: 'image/png' })


      console.log(fileSizeInBytes / 1024)

      if ((Number(fileSizeInBytes / 1024)) > 390) {

        await ctx.reply(`🏄‍♂️ <strong>Create an inscription:</strong>

         File Size Exceeds <strong>390KB</strong>`,
          {
            parse_mode: 'HTML', disable_web_page_preview: true,
            reply_markup: CloseMenu
          })
      } else {
        const img = await nftstorage.store({
          image: imageFile,
          name: 'Insc-' + ctx.dbuser.username,
          description: 'Insc-' + ctx.dbuser.username,
        })

        console.log(img)
        await ctx.reply(`🏄‍♂️ <strong>Create an inscription:</strong>

<strong>The IPFS Hash : ${img.ipnft}</strong>
<strong>The IPFS Link : ${img.url}</strong>
Estimate the funds to send using the command /fee ${fileSizeInBytes / 1024}
If you'd like to proceed, send the funds to your Bitcoin address to receive the inscription and type /generate @ipfshash`,
          {
            parse_mode: 'HTML', disable_web_page_preview: true,
            reply_markup: CloseMenu
          })
      }
    }
  });


  // Errors
  bot.catch(console.error)
  // Start bot
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
