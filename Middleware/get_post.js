module.exports=  get_post=function(req,res,next){
    const query=req.query
    Object.assign(req.body,query)
    next()
}