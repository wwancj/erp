const Router = require("express").Router()


const { User } = require("@db/db.js")

const { jwt_token } = require("@M/token.js")


const get_user = Router.post("/get_user", jwt_token, async (req, res) => {

    if (req.User.user == "root") {
        const resu = await User.find({}, { password: 0 })
        res.json(resu)
    } else if (req.User.position == "经理") {
        const resu = await User.find({ $or:[{position: ["员工", "组长", "无"], department: req.User.department },{
            _id:req.User.id
        }]}, { password: 0 })
        res.json(resu)
    }else if(req.User.position=="组长"){
        const resu = await User.find({ $or:[{position: ["员工", "无"], department: req.User.department },{
            _id:req.User.id
        }]}, { password: 0 })
        res.json(resu)
    }

})




const updata_user = Router.post("/updata_user", async (req, res) => {


    let { old, _new } = req.body

    console.log(old, _new);
    User.findOneAndUpdate(old, _new, {},
        (err, data) => {
            if (!err) {
                res.send("修改成功")
            } else {
                res.send("修改失败")
            }
        })

})



const add_user=Router.post("/add_user",async ()=>{

})


module.exports = { get_user, updata_user }