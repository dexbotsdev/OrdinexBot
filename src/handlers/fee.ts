import Context from '@/models/Context'
import { StartScreenMenu } from '@/menus/StartScreenMenus';
import { CloseMenu } from '@/menus/CloseMenu';
function satsToBTC(sats: number): number {
    const satoshisInBitcoin = 100000000;
    return sats / satoshisInBitcoin;
}

export default function fee(ctx: Context) {

    if (!ctx.match) {
        return ctx.reply(
            `💵 Check current inscription fees:

        Enter the file size in bytes
        300kb = 300000
         /fee {file_size_bytes}
        
        Example: /fee 300000
    `, {
            reply_markup: CloseMenu, parse_mode: 'HTML',
            disable_web_page_preview: true
        },
        );
    } else {
        let kb = "Feedata For " + ctx.match.toString() + "Bytes of Data";

        console.log(ctx.dbuser);

        const address = ctx.dbuser.address; // the receiver address
        const inscriptionBalance = 546; // the balance in each inscription
        const fileCount = 1; // the fileCount
        const fileSize = Number(ctx.match.toString()); // the total size of all files
        const contentTypeSize = 100; // the size of contentType
        const feeRate = 10; // the feeRate
        const feeFileSize: any = 100; // the total size of first 25 files
        const feeFileCount = 25 // do not change this
        const devFee = 1000; // the fee for developer

        const balance = inscriptionBalance * fileCount;

        let addrSize = 25 + 1; // p2pkh
        if (address.indexOf('bc1q') == 0 || address.indexOf('tb1q') == 0) {
            addrSize = 22 + 1;
        } else if (address.indexOf('bc1p') == 0 || address.indexOf('tb1p') == 0) {
            addrSize = 34 + 1;
        } else if (address.indexOf('2') == 0 || address.indexOf('3') == 0) {
            addrSize = 23 + 1;
        }

        const baseSize = 88;
        let networkSats = Math.ceil(((fileSize + contentTypeSize) / 4 + (baseSize + 8 + addrSize + 8 + 23)) * feeRate);
        if (fileCount > 1) {
            networkSats = Math.ceil(((fileSize + contentTypeSize) / 4 + (baseSize + 8 + addrSize + (35 + 8) * (fileCount - 1) + 8 + 23 + (baseSize + 8 + addrSize + 0.5) * (fileCount - 1))) * feeRate);
        }
        let networkSatsByFeeCount = Math.ceil(((feeFileSize + contentTypeSize) / 4 + (baseSize + 8 + addrSize + 8 + 23)) * feeRate);
        if (fileCount > 1) {
            networkSatsByFeeCount = Math.ceil((((feeFileSize) + contentTypeSize * (feeFileCount / fileCount)) / 4 + (baseSize + 8 + addrSize + (35 + 8) * (fileCount - 1) + 8 + 23 + (baseSize + 8 + addrSize + 0.5) * Math.min(fileCount - 1, feeFileCount - 1))) * feeRate);
        }

        const baseFee = 1999 * Math.min(fileCount, feeFileCount); // 1999 base fee for top 25 files
        const floatFee = Math.ceil(networkSatsByFeeCount * 0.0499); // 4.99% extra miner fee for top 25 transations
        const serviceFee = Math.floor(baseFee + floatFee);

        const total = balance + networkSats + serviceFee;
        const truncatedTotal = Math.floor((total) / 1000) * 1000; // truncate
        const amount = truncatedTotal + devFee; // add devFee at the end

        return ctx.reply(`<strong>💵 Current chain fee:</strong>

        Fee for this file: ${satsToBTC(amount)} BTC
        
        Create an order: /create`, {
            reply_markup: CloseMenu, parse_mode: 'HTML',
            disable_web_page_preview: true
        });
    }
}


