function position_diff(req,fun1,fun2,fun3,fun4){
    switch(req.User.position){
        case "经理": fun1() 
            break;
        case "组长": fun2() 
            break;
        case "员工": fun3() 
            break;
        default:fun4()

    }
}
module.exports={position_diff}