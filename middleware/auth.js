const jwt = require('jsonwebtoken');
const config = require('config'); 
module.exports =  (req,res,next) =>{
    if(req.method === "OPTIONS"){
        return next();
    }

    try{
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token){
            return res.status(401).json({message: 'Не предоставлены данные авторизации'});
        }

        const decoded = jwt.verify(token, config.get('jwt-secret'));
        req.user = decoded;
        next();
    } catch(e){
        res.json(401).json({message: 'Ошибка авторизации'});
    }
}