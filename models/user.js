const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userSchem=new Schema(
    {_id:Number,
        userid:String,
        substype:[String]
    },{_id:false}
)

const User=mongoose.model("User",userSchem)

const unpaid=new Schema(
    {_id:String,
        amount:Number
    },
    {timestamps:true,_id:false}
)
const Amount=mongoose.model("Amount",unpaid)
module.exports.user=User;
module.exports.amount=Amount;

