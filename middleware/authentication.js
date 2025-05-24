const{verifytoken} = require("../services/authentication")

function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
    
       
        const tokenCookieValue = req.cookies[cookieName]
       
        if(!tokenCookieValue){
           return next();
        }

        try{
            const userPayload = verifytoken(tokenCookieValue)
            // console.log(userPayload)
           req.user  = userPayload;
            // console.log(req.user)
        } catch(error){}
         return next(); 
    }
}

module.exports = {
    checkForAuthenticationCookie
}