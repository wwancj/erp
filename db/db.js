const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const { emaildb_Schema } = require("./emaildb")

//设置密码加密强度 10为中等  太大效率过慢
const ind = 10
mongoose.connect("mongodb://localhost:27017/user", {
    // useCreateIndex:true,
    useNewUrlParser: true
})


const User = mongoose.model("User", new mongoose.Schema({
    user: { type: String, unique: true,required:true},
    password: {
        type: String, set(val) {
            //密码使用bcrypt进行加密
            return bcrypt.hashSync(val, ind)
        }, 
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    //部门
    department: {
        type: String,
        default: "无",
        enum: ["开发部", "人事部", "营销部", "销售部","无"]
    },
    //职位
    position: {
        type: String,
        default: "无",
        enum: ["Root","经理", "组长", "员工","无"]
    },
    gender: {
        type: String,
        enum: ["男", "女"]
    },
    icode:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        enum:["在职","离岗","休假"],
        default:"在职"
    }

}))

const Email = mongoose.model("Email", emaildb_Schema)



// Email.db.dropCollection("emails")
module.exports = { User, Email, mongoose }