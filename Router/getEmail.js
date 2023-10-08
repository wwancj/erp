const express = require("express");
const get_emali = express.Router();

const { Email } = require("../db/db.js");
const { main } = require("../Middleware/send_email.js");

/**
 * @api {post} /get_email 验证码获取
 * @apiDescription 获取邮箱验证码
 * @apiName get_emali
 * @apiGroup verify
 * @apiParam {string} email 用户名
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *
 *  }
 * @apiSampleRequest http://localhost:7777/get_email
 */

get_emali.post("/get_email", async (req, res, next) => {
  console.log(req.body);
  const { email } = req.body;
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

  const isemail = reg.test(email);

  if (isemail) {
    console.log(email);

    const isexit = await Email.findOne({ email });
    console.log(isexit);
    if (isexit) {
      console.log(isexit);
      res.send("请60s 后尝试");
      return;
    } else {
      console.log("不存在");
      const Verification = Math.floor(Math.random() * 999999);
      const addemail = await Email.create({ email, Verification }, (err) => {
        if (!err) {
          main(email, Verification).then(() => {
            res.send("发送验证码成功");
            console.log("发送验证码成功");
          });
        } else {
          res.send("请60s 后尝试");
        }
      });
    }
  } else {
    res.send("邮箱错误");
  }
});

get_emali.post("/get_emali/users", async (req, res, next) => {
  let { email, verify, password } = req.body;
  console.log(req.body);
  const use = await Email.find({ email, verify });
  res.send(`当前注册用户为${use}`);
});

module.exports = { get_emali };
/**
 *
 *
 *
 *
 *
 */
