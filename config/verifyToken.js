const jwt = require('jsonwebtoken')

function auth(req,res,next)
{
    const token = req.header('auth')
    
    if(!token) return res.send('Access denied')

    try {
        const verified = jwt.verify(token, 'secret')

        req.user = verified
        next()
    } catch (error) {
        res.send(error)
    }

}

module.exports = auth