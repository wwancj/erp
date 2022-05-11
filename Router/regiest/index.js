
/**
 * @api {post} /register 注册
 * @apiDescription 注册用户
 * @apiName  register
 * @apiGroup register
 * @apiParam {string} email 邮箱
 * @apiParam {string} verify 验证码
 * @apiParam {string} password 密码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} 成功响应
 *  {result:"注册成功"}
 * @apiErrorExample {json} 失败响应
 * {
 * result:"注册失败"
 * }
 * 
 */

const express = require("express")
const regiest=express.Router()

const {  Email,User} = require("../../db/db.js")
// const { main } = require("../../Middleware/send_email")

regiest.post("/register",async (req,res,next)=>{
    let {email,verify,password}=req.body
    console.log("email",email);

    let hasEmail=await Email.findOne({email,verify}
    
    )

    if(hasEmail){
        User.create({
            user:email,password
        },(err)=>{
            if(!err){
                res.json({result:"注册成功"})
            }else{
                res.send({result:"注册失败"})
            }
        })
      
    }else{
        res.json({result:"注册失败"})
    }
    
})

module.exports=regiest