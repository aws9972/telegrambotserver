const express =require("express");
const app=express();

const mongoose = require('mongoose');
// const assert = require('assert');

const models=require('./models/user')
const uri = "mongodb+srv://aws:eLHM5mHTKabF_qa@cluster0.natrf.mongodb.net/mining?retryWrites=true&w=majority";


const https = require('https')
const axios = require('axios').default;

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1727339580:AAE4BvfbdJWOK_4yg5IH72l695QIpWiA_Hw';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


let port=process.env.PORT || 3000;

 mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


app.get("/add",(req,res)=>{
    
    res.send("Hello World")
    });

app.get("/",(req,res)=>{
res.send("Hello World")
});
app.listen(port,()=>{
    console.log(port)
});

app.get("/sendm",async (req1,res1)=>{
var date=new Date();
var fdate=`${date.getDate()}`+"-"+`${date.getMonth()+1}`


var ydate=new Date(new Date().setDate(new Date().getDate()-1));
var fydate=`${ydate.getDate()}`+"-"+`${date.getMonth()+1}`

/////////// get unpaid amount 
    axios.get(
        'https://api.ethermine.org/miner/0x103836D8BA826c49C1B41b8b4bdED96dd26066C4/currentStats'
        ).then(async(s)=>{

            var unpaid=s.data.data.unpaid;
            var paid2=`${unpaid}`.substring(0,4)/100000
var prof=paid2;
            const amountmd=new models.amount({
              _id:fdate,
              amount:paid2
              
                })
                ////////// save today unpaid 
                amountmd.save({
                    
                },).then((reslt)=>{
                 
                  console.log(reslt)
                  var ypaid=0;
                  ////// get yseterday unpaid
                  models.amount.findById(fydate).then(async (yres)=>{
                    if(yres===null)
                    {

                      // console.log(fydate)
                      // console.log(fdate)
                      // console.log(prof)
                      // console.log(ypaid)
                      // console.log(profit)
                      res1.send("Hello World")

                    }else
                    {
 ypaid=yres.amount;
var profit=(prof-ypaid).toString().substring(0,7);

console.log(fydate)
console.log(fdate)
console.log(prof)
console.log(ypaid)
console.log(profit)
var usdprice=0;
// 
console.log("eet")
await   axios.get(
  'https://min-api.cryptocompare.com/data/price?fsym=eth&tsyms=USD&api_key=8745ca04378cad9a34575db425ccdb9ef70e8c6be6e3e13749312453611233c3'
  ).then((s)=>{
usdprice=s.data.USD;
console.log(s)
usdprice*=profit
console.log(usdprice)

  });
models.user.find().then(
  (resl)=>{
    resl.forEach(element => {
      console.log(element._id);
      bot.sendMessage(element._id,`ارباح اخر 24 ساعه لتاريخ ${fdate}  \n رصيد البارحه:${ypaid} ETH\n رصيد اليوم: ${prof} ETH \n الربح: ${profit} ETH \n الربح بلدولار: ${usdprice.toFixed(2)} $ اوللللة`);

    });
    res1.send("Hello World")

  }
)
                    }
                  })
                      
                }).catch(e=>{
                  // models.user.find().then(
                  //   (resl)=>{
                  //     resl.forEach(element => {
                  //       console.log(element._id);
                  //       bot.sendMessage(element._id,`<b> ارباح اخر 24 ساعه لتاريخ ${fdate} </b>`);
                  
                  //     });
                  //     res1.send("Hello World")
                  
                  //   }
                  // )
             });
         
        

        })


    
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



  app.get("/send2",(req1,res1)=>{

    
    var date=new Date(new Date().setDate(new Date().getDate()-6));
    var fdate=`${date.getDay()}`+"-"+`${date.getMonth()}`

    console.log(fdate)
    });




    bot.onText(/\/start/, (msg) => {
      models.user.findById(msg.chat.id).then((reslt)=>{
        if(reslt===null)
        {
          const user=new models.user({
            userid:msg.chat.id,
            _id:msg.chat.id,
          
          });

          user.save({
          
          }).then((reslt2)=>{
          
            console.log(reslt2)
              
          });
        }
      
       
      })

    
    

      // bot.sendMessage(msg.chat.id, "Welcome", {
      // "reply_markup": {
      //     "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
      //     }
      // });
          
      });



      bot.onText(/\/stop/, (msg) => {
        models.user.findByIdAndRemove(msg.chat.id).then((reslt)=>{
        console.log(reslt)
        
         
        })
  
      
      
  
        // bot.sendMessage(msg.chat.id, "Welcome", {
        // "reply_markup": {
        //     "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
        //     }
        // });
            
        });