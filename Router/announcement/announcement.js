const {User}=require("../../db/db.js")
const {Announcement}=require("../../db/announcement")
const express = require("express")
const get_Announcement=express.Router()


// console.log(1);

Announcement.create({publisher:"626bb55899446d5edbb9c055"},function(err,doc){
   if(!err){
       console.log('插入成功',doc);
   }
})





//626bb55899446d5edbb9c055
// get_Announcement.post("/get_Announcement",(req,res,next)=>{
    
// })
// console.log(Announcement);