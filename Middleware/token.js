
const jwt = require("jsonwebtoken")
const tokenScreen = "ertertsdfgsdg3457%gd"
const { User } = require("../db/db.js")

const jwt_token = (res, req, next) => {
    let tokenJson,tokendata

    try {
         tokenJson = res.headers.authorization.split(" ")[1]
         tokendata = jwt.verify(tokenJson, tokenScreen)
         res.User=tokendata
     
         console.log("当期用户",res.User);
    } catch (err) {
        req.send({ message: "token值错误" })
        
    }

    // console.log("token",tokendata,"----------------------");

    // if(!tokendata){
    //    console.log("token出错")
    // }


    if(tokendata){
        let user_exist = User.findById(tokendata.id, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
        }
    })
      res.token = tokendata
      next()
    }
    

  
}

module.exports = { jwt_token }