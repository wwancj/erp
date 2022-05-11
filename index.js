require("module-alias/register")
//加载全局环境变量
const dotenv = require("dotenv")
dotenv.config()


const express = require("express")
const path = require("path")
const { send } = require("process")
const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
const app = express()
const { main } = require("./Middleware/send_email.js")
app.use(express.json())

var cors = require('cors')
app.use(cors())

//静态资源中间件
app.use(express.static(path.join(__dirname, "public")))




//单独存放在 .env
// const tokenScreen = "ertertsdfgsdg3457%gd"
const tokenScreen=process.env.tokenScreen


//注册路由
const regiest=require("./Router/regiest/index")

app.use(regiest)



const { User } = require("./db/db.js")


app.get("/findAll",async (req,res)=>{
    let resu=await User.find({})
    res.send(resu)
})


app.get("/kk",(req,res)=>{
    res.send(req.body.name)
})



// 权限判断中间件
const { jwt_token } = require("./Middleware/token.js")




const get_post=require("./Middleware/get_post")

app.use(get_post)


//获取用户详情

app.get("/info", jwt_token, (res, req, next) => {

    req.send(res.token)
})



app.get("/index", (rsp, req, next) => {

    req.send("ok")

})


//邮箱路由中间件
const {get_emali}=require("./Router/getEmail")
app.use(get_emali)



//登录路由中间件
const Login=require("./Router/login")
app.use(Login)



//查询用户路由


const {get_user,updata_user}=require("@Router/get_user/index")

app.use(get_user)
app.use(updata_user)



app.post("/regiest", async (req, res) => {
    const usermessage = { user, password } = req.body
    const u = await User.create(usermessage, function (err) {
        if (!err) {
            res.send({ message: "注册成功" })
        } else {
            res.send({ message: "注册失败" })
        }
    })

})











app.get("*", (res, req, next) => {
    console.log(3333333);
    req.status(505)
    req.send("接口不存在")
    next()
})





app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('出错了！');
});


app.listen(8877, "0.0.0.0", function () {
    console.log("app run in 127.0.0.1:8877");
})



