const express =require("express");
const app=express();

const mongoose = require('mongoose');
// const assert = require('assert');

const models=require('./models/user')
const uri = "ur mongo db uri";
const schedule = require('node-schedule');



const https = require('https')
const axios = require('axios').default;

const TelegramBot = require('node-telegram-bot-api');

// // replace the value below with the Telegram token you receive from @BotFather
const token = 'your telegram bot token';
//  const bot = require('./job').bot

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
// exports.bot= bot
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
const getprof=()=>{
  console.log("1")
  var date=new Date();
  var fdate=`${date.getDate()}`+"-"+`${date.getMonth()+1}`
  
  
  var ydate=new Date(new Date().setDate(new Date().getDate()-1));
  var fydate=`${ydate.getDate()}`+"-"+`${ydate.getMonth()+1}`
  
  /////////// get unpaid amount 
      axios.get(
          'https://api.ethermine.org/miner/youtethermindeaddress/currentStats'
          ).then(async(s)=>{
            console.log("2")

              var unpaid=s.data.data.unpaid;
              var paid2=unpaid*0.000000000000000001
              // var paid2=`0.00${unpaid.toString().substr(0,4)}`
  var prof=paid2;
  console.log("3")

              const amountmd=new models.amount({
                _id:fdate,
                amount:paid2
                
                  })
                  console.log("4")

                  ////////// save today unpaid 
                  amountmd.save({
                      
                  },).then((reslt)=>{
                    console.log("5")

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
                     return;
  
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
  var usdprof=0;
  // 
  console.log("eet")
  await   axios.get(
    'https://min-api.cryptocompare.com/data/price?fsym=eth&tsyms=USD&api_key=yourapiakey'
    ).then((s)=>{
  usdprice=s.data.USD;
  console.log(s)
  // usdprice*=profit
  usdprof=usdprice*profit
  console.log(usdprice)
  
    });
  models.user.find({substype:"prof"}).then(
    (resl)=>{
      resl.forEach(element => {
        console.log(element._id);
        // bot.sendMessage(element._id,`?????????? ?????? 24 ???????? ???????????? ${fdate}  \n ???????? ??????????????:${ypaid} ETH\n ???????? ??????????: ${prof} ETH \n ??????????: ${profit} ETH \n ?????????? ??????????????: ${usdprof.toFixed(2)} $  \n  ?????? ?????????????????? ??????????: ${usdprice} $`);
          bot.sendMessage(element._id,
            `?????????? ?????? 24 ???????? ???????????? ${fdate}  \n ???????? ??????????????:${ypaid} ETH\n ???????? ??????????: ${prof.toFixed(4)} ETH \n ??????????: ${profit} ETH \n ?????????? ??????????????: ${usdprof.toString().substring(0,6)} $  \n  ?????? ?????????????????? ??????????: ${usdprice} $`);

      });
  
  
    }
  )
                      }
                    })
                        
                  }).catch(e=>{
           console.log(e)
               });
           
          
  
          })
  
  
}
app.get("/sendm",async (req1,res1)=>{
getprof()
    
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
bot.on('message',async (msg) => {
    const chatId = msg.chat.id;
  console.log(chatId)
  console.log(" ,asdsad")
  if(msg.text==="??????????"||msg.text==="1")
  {
    await   axios.get(
      'https://api.minerstat.com/v2/stats/yoursecuritycode/urworkername'
      ).then((s)=>{
        
var os=s.data.WORKER001.info.os;
var gpus=s.data.WORKER001.hardware;
for (let i = 0; i < gpus.length; i++) {
const element = gpus[i];



bot.sendMessage(chatId,` <b>${element.name}</b> - \n Temp: ${element.temp} C \n Fan: ${element.fan}% \n Power: ${element.power} watt  \n speed: ${element.speed} `,
{parse_mode : "HTML"});

}
console.log("end")


      })
    // bot.sendMessage(chatId, 'Received your message2');
  }else if(msg.text==="2")
  {
    var ydate=new Date(new Date().setDate(new Date().getDate()-1));
    var fydate=`${ydate.getDate()}`+"-"+`${ydate.getMonth()+1}`
    
    axios.get(
      'https://api.ethermine.org/miner/ethadress/currentStats'
      ).then(async(s)=>{

          var unpaid=s.data.data.unpaid;

           unpaid*=0.000000000000000001

          models.amount.findById(fydate).then(async (yres)=>{
            if(yres===null)
            {

            
              // res1.send("Hello World")

            }else
            {
ypaid=yres.amount;
var profit=(unpaid-ypaid).toString().substring(0,7);

var usdprice=0;
var usdprof=0;
// 
console.log("eet")
await   axios.get(
'https://min-api.cryptocompare.com/data/price?fsym=eth&tsyms=USD&api_key=apikey'
).then((s)=>{
usdprice=s.data.USD;
console.log(s)
// usdprice*=profit
usdprof=usdprice*profit
console.log(usdprice)

});



bot.sendMessage(chatId,
  `?????????????? ???? ?????????????? ?????? ???????? \n ???????? ??????????????:${ypaid} ETH\n  ???????????? ????????????: ${unpaid.toFixed(4)} ETH \n ??????????: ${profit} ETH \n ?????????? ??????????????: ${usdprof.toFixed(2)} $  \n  ?????? ?????????????????? ??????????: ${usdprice} $`);



// {"_id":{"$numberInt":"61159086"},"userid":"AB","__v":{"$numberInt":"0"},"substype":["prof","prof"]}

// res1.send("Hello World")


            }
          })


        
        });
    
    // const user1=new models.user({
    //   _id:12,
    //   userid:12
      
    //     })
    //     ////////// save today unpaid 
    //  await   amountmd.save({
            
    //     },)
    // await models.user.find({substype:"temp"}, 
    //  )
    // .then(s=>{
    //   console.log(s)

    // })

    var date=new Date(new Date().setDate(new Date().getDate()-1));
    var fdate=`${date.getDay()}`+"-"+`${date.getMonth()+1}`

    console.log(fdate)
    // res1.json({"a":"1"})
  }
    // send a message to the chat acknowledging receipt of their message
    else
    bot.sendMessage(chatId, 'Received your message');
  });



  app.get("/send2",async(req1,res1)=>{
var x=9797438710129722;
console.log(`0.00${x.toString().substr(0,5)}`-0.001);
   
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

    
    

      bot.sendMessage(msg.chat.id, "??????????", {
      "reply_markup": {
          "keyboard": [["2", "1"],  
       ]
          }
      });
          
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



        bot.onText(/\/starttemp/, async(msg) => {



          await models.user.updateOne({
            userid:msg.chat.first_name,
            _id:msg.chat.id}, 
            { $push: { substype: "temp"} },{upsert:true})
       
          // models.user.find({substype:"temp"},).then((reslt)=>{
          //   if(reslt===null)
          //   {
          //     const user=new models.user({
          //       userid:msg.chat.id,
          //       _id:msg.chat.id,
              
          //     });
    
          //     user.save({
              
          //     }).then((reslt2)=>{
              
          //       console.log(reslt2)
                  
          //     });
          //   }
          
           
          // })
    
        
        
    
          // bot.sendMessage(msg.chat.id, "Welcome", {
          // "reply_markup": {
          //     "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
          //     }
          // });
              
          });
    

          bot.onText(/\/stoptemp/, async(msg) => {
            await models.user.updateOne({
              userid:msg.chat.first_name,
              _id:msg.chat.id}, 
              { $pullAll: { substype:[ "temp"] } },{upsert:true})
          });


          bot.onText(/\/startprofit/, async(msg) => {



            await models.user.updateOne({
              userid:msg.chat.first_name,
              _id:msg.chat.id}, 
              { $push: { substype: "prof"} },{upsert:true})
         
     
                
            });


            bot.onText(/\/stopprofit/, async(msg) => {
              await models.user.updateOne({
                userid:msg.chat.first_name,
                _id:msg.chat.id}, 
                { $pullAll: { substype:[ "prof"] } },{upsert:true})
            });



            app.get("/checktemp",async(req1,res1)=>{

              await   axios.get(
                'https://api.minerstat.com/v2/stats/code/workername'
                ).then((s)=>{
                  
var os=s.data.WORKER001.info.os;
var gpus=s.data.WORKER001.hardware;
for (let i = 0; i < gpus.length; i++) {
  const element = gpus[i];
  if(element.temp>=60||element.fan>61)
  {
    models.user.find({substype:"temp"}).then(
      (resl)=>{
        resl.forEach(element2 => {
          console.log(element2._id);
          bot.sendMessage(element2._id,`???????? ?????? ???????????? \n ${element.name} - \n Temp: ${element.temp} \n Fan: ${element.fan}% \n Power: ${element.power} watt`);
    
        });
      
    
      }
    )
    
  }
}
console.log("end")
res1.status(200)
res1.json({})

                })

            })


            const job = schedule.scheduleJob(
              '* 20 * * *', 
              function async(){
                console.log("startewd")
           getprof();
            });