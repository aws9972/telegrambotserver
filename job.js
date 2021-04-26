const  TelegramBot = require('node-telegram-bot-api');
 const token = '1727339580:AAE4BvfbdJWOK_4yg5IH72l695QIpWiA_Hw';
 const bot = new TelegramBot(token, {polling: true});
exports.bot= bot