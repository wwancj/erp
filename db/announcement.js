//公告数据库

// const mongoose=require("mongoose")


const {mongoose}=require("./db")
const announcement_Schema=new mongoose.Schema({
 //公告标题  
  title:{type:String},
  //公告内容
  content:{type:String},
  //发布时间
  publish_time:{type:Date,default:Date.now},
  //发布者
  publisher:{type:String,required: true},
  //是否撤销
  if_cancel:{type:Boolean,default:false},
  //撤销时间
  cancel_time:{type:Date,default:null},
  //优先级
  priority:{type:String},
  //接受者类型
  user_type:{type:String}
})


const Announcement=mongoose.model("announcement",announcement_Schema)


// console.log(Announcement);

// Announcement.create({
//   title:"第一个通知",
//   content:"下午两节课",
//   publisher:"boss",
//   priority:"重要",
//    user_type:"员工"
// })
// console.log();

// let a=async function(){
//  let res= await Announcement.find()
//  console.log(res);
// } 
// a()
module.exports={Announcement}

