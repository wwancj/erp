const nodemailer=require("nodemailer")

async function main(username,nums) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'qq',
       port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "2138743574@qq.com", // generated ethereal user
        pass: 'lrnrrxkgyvcxdadi', // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from:"2138743574@qq.com",
        to:username,
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>验证码：${nums}</b>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  // main("1363585100qcom",34534534).then((data)=>{
  //   console.log("cgo",data);
  // },(err)=>{console.log("err",err);})



  module.exports={main}