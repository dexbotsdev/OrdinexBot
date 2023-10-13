import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import configureI18n from '@/middlewares/configureI18n'
import handleLanguage from '@/handlers/language'
import i18n from '@/helpers/i18n'
import languageMenu from '@/menus/language'
import sendHelp from '@/handlers/help'
import startMongo from '@/helpers/startMongo'
import UserContext from './models/Context'
import startBot from './handlers/start'
import { StartScreenMenu } from './menus/StartScreenMenus'
import { DeleteMessageMenu } from './menus/DeleteMessageMenu'
import { ProfileScreenMenu } from './menus/ProfileScreenMenu'
import { CaptureTagQuestion } from './handlers/CaptureStarTag'
import { CustomAlertsMenu } from './menus/CustomAlertsMenu'
import { MinScoreQuestion, minTwitterFollowersQuestion } from './handlers/CustomAlerts'
import { WelcomeUser } from './handlers/WelcomeUser'
import { BackMainMenu } from './menus/BackMainMenu'
import { Snipermenu } from './menus/SniperMenu'
import { SettingsMenu } from './menus/SettingsMenu'
import { MaxGasLimitQuestion, MaxGasPriceQuestion, SettingsScreen } from './handlers/SettingsScreen'

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('Mongo connected')
  bot
    .use(attachUser)
    .use(BackMainMenu)
    .use(Snipermenu)
    .use(SettingsMenu)
    .use(DeleteMessageMenu)
    .use(CustomAlertsMenu)
    .use(ProfileScreenMenu)
    .use(StartScreenMenu)
    .use(CaptureTagQuestion.middleware())
    .use(MinScoreQuestion.middleware())
    .use(minTwitterFollowersQuestion.middleware())
    .use(MaxGasLimitQuestion.middleware())
    .use(MaxGasPriceQuestion.middleware())


  bot.command('start', startBot)
  bot.command('menu', WelcomeUser)
  bot.command('settings', SettingsScreen)


  // Errors
  bot.catch(console.error)
  // Start bot
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
