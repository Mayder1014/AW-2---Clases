import jwt from 'jsonwebtoken'

// sign

// verify

jwt.sign({usuario: 'FacundoE'}, 'largaysupersecreta', {expiresIn: '1h'}, (error, token)=>{
    console.log(token)
})





