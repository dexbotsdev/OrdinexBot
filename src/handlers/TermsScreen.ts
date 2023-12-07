import { AgreeMenu } from '@/menus/AgreeMenu';
import { StartScreenMenu } from '@/menus/StartScreenMenus';
import Context from '@/models/Context';

export function TermsScreen(ctx: Context) {



    return ctx.reply(`🎯 Terms of Service 
    
    Welcome to OrdinexBot, the Telegram bot explorer for BRC-20 blockchain.
By using this bot, you agree to the following terms and conditions:

    Purpose: OrdinexBot is a tool designed to provide information and exploration capabilities for BRC-20 tokens on the blockchain. It allows users to retrieve data, including token balances, transaction history, inscriptions and other related information.

    Accuracy of Information: While we strive to provide accurate and up-to-date information, we do not guarantee the accuracy, completeness, or reliability of the data retrieved through the bot. Users are encouraged to verify information obtained from this bot through other reliable sources.

    Use of Information: The information provided by OrdinexBot should not be considered as financial or investment advice. Users are responsible for their own decisions and actions based on the information obtained through the bot.

    Privacy: We respect your privacy. However, please note that interactions with the bot may involve the collection and storage of certain user data for the sole purpose of improving user experience and service quality. We do not share this data with third parties unless required by law.

    Changes to Terms: We reserve the right to update or modify these terms at any time without prior notice. It is the user's responsibility to review the terms periodically for any changes. Continued use of the bot after modifications constitutes acceptance of the revised terms.

    Disclaimer: The use of OrdinexBot is at the user's own risk. We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use the bot.

    By using OrdinexBot, you acknowledge that you have read, understood, and agree to these Terms of Service.

    If you do not agree with these terms, please refrain from using the bot.

    For any inquiries or concerns, please contact the developer.

    Thank you for using OrdinexBot!
    `,
        {
            parse_mode: "HTML", disable_web_page_preview: true,
            reply_markup: AgreeMenu
        },);
}
