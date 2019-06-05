const jwt = require('jsonwebtoken')
//Verificatar token

let verificar_token = (req,res,next)=>{
    let token = req.get('token');
    jwt.verify(token,process.env.SEED,(err,result)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err:{
                    msg:"TOKEN NO VALIDO"
                }
            })
        }
        req.usuario = result.usuario
        next();

    })
}
module.exports =
{
    verificar_token
}