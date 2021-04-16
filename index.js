const express =require("express");
const app=express();

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1727339580:AAE4BvfbdJWOK_4yg5IH72l695QIpWiA_Hw';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


let port=process.env.PORT || 3000;

app.get("/",(req,res)=>{
res.send("Hello World")
});
app.listen(port,()=>{
    console.log(port)
});

app.get("/sendm",(req,res)=>{
    res.send("Hello World")
    });


    // Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
  
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
  });