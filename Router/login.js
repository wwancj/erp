/**
 * @api {post} /login 登录
 * @apiDescription 登录接口如果登录成功，则会获取到一个token值，在后续的请求中需要将此token值添加到授权头中
 * {
 * 
 * }
 * @apiName login
 * @apiGroup login
 * @apiParam {string} user 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} 成功响应
 *  {
  "user": "root",
  "id": "626781dcdfd40aac9106181d",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjc4MWRjZGZkNDBhYWM5MTA2MTgxZCIsInVzZXIiOiJyb290IiwiZGVwYXJ0bWVudCI6IuaXoCIsInBvc2l0aW9uIjoi5pegIiwiaWF0IjoxNjUxNDUyOTMyfQ.pjfGcbj035WRDn4Pl49fcgpxkgfPfFezl6jjXiHe-kQ",
  "department": "无",
  "position": "无",
  "result": "登录成功"
}
 * @apiErrorExample {json} 失败响应
 * {
 * "message": "密码错误"
 * }
 * 
 * 
 * @apiSampleRequest http://127.0.0.1:7777/login
 */


const jwt = require("jsonwebtoken")
const { User } = require("../db/db.js")

const bcrypt = require("bcrypt")
const tokenScreen=process.env.tokenScreen


const express=require("express")
const Login=express.Router()
Login.post("/login", async (req, res, next) => {
    const { user, password } = req.body



    const current_user = await User.findOne({ user })
 
    if (current_user) {
        const compare_res = await bcrypt.compareSync(password, current_user.password)
        console.log("密码正确",compare_res);

        if (compare_res) {
            //token 加密  message 经过加密后发送给 用户
            let message = { id: String(current_user._id),user: current_user.user,department:current_user.department,position:current_user.position}

            // token 为  message 加密后的密文
            let token = jwt.sign(message, tokenScreen)



            res.send({ user: current_user.user, id: current_user._id, token,department:current_user.department,position:current_user.position,result:"登录成功"})
        } else {
            res.send({ message: "密码错误" })
        }

    } else {
        res.send({ message: "用户不存在" })
    }

})

module.exports= Login