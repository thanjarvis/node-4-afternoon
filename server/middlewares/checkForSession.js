module.exports = function(req, res, next){
    const {session} = req
    if(!req.session.user){
        session.user = {
            username: '',
            cart: [],
            total: 0
        }
    }
    next()
}

