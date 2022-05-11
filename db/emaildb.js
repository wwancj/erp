const mongoose=require("mongoose")


const emaildb_Schema=new mongoose.Schema({
    email:{type:String,unique:true,index: { expires: 60 }},
    Verification :{type: String},
    createdAt: { type: Date, default: Date.now, index: { expires: 30 } }
},  {
    usePushEach: true,
  })

module.exports={emaildb_Schema}