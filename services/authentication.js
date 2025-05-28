const jwt = require('jsonwebtoken')

const scret = "echolamo"
function createtoken(user){

    const payload = {
        _id:user._id,
        email:user.email,
        fullname:user.fullname,
        profileImageURL:user.profileImageURL,
        role:user.role,

    };
    const token  = jwt.sign(payload,scret);
    return token;
}

function verifytoken(token){
    const payload = jwt.verify(token,scret);
    return payload;
}

module.exports = {
    createtoken,
    verifytoken
}