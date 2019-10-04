const jwt = require('jsonwebtoken');


module.exports =function auth(req,res,next) {
    const tokenSecret = "dfsafasdfsedsf";
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied');

    try{
        const verified = jwt.verify(token,tokenSecret);
        req.user = verified;
    }catch(err) {
        res.status(400).send('invalid token');
    }
}