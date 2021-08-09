const { models: {User} } = require('../db')

const requireToken = async ( req, res,next ) => {
    try {
        const token = req.headers.authorization
        const user = await User.findByToken(token)
        req.user = user
        next()
    } catch (e) {
        next(e)
    }
}

// o: missing admin / logged in stuff

module.exports = {
    requireToken
}