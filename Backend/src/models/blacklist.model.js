// We use token blacklisting so that a token can be explicitly revoked
// even if it has not yet expired. Simply deleting the token on the
// client side is not enough because the token may still be valid and
// anyone who copied it before logout can continue to use it. Blacklisting
// ensures the server refuses requests made with tokens that should no
// longer be accepted, protecting against reuse of stolen or leaked tokens.

const mongoose=require('mongoose')

const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be blacklisted"],
    },
    
})

const tokenBlacklistModel=mongoose.model("blacklistTokens",blacklistTokenSchema)

module.exports=tokenBlacklistModel