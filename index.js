const express =require("express");
const app=express();

const https = require('https')
const axios = require('axios').default;

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

app.get("/sendm",(req1,res1)=>{

    axios.get(
        'https://api.ethermine.org/miner/0x103836D8BA826c49C1B41b8b4bdED96dd26066C4/currentStats'
        ).then((s)=>{
            var unpaid=s.data.data.unpaid;
            var paid2=`${unpaid}`.substring(0,4)/100000
           
        })

 bot.sendMessage("61159086",`${paid2}`)
    res1.send("Hello World")
    
    });

    // Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
  
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
  
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });


    // Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
  console.log(chatId)
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
  });