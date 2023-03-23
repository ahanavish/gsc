module.exports = async function checkEmail(req,res,next){
    var emailVerified = req.body.emailVerified
    console.log(emailVerified);
    console.log('middlware');
    if(emailVerified){
        console.log('In here');
        next();
    }
    else{
        return res.status(401).send({verified:false, message: "Unauthorized"})
    }
}