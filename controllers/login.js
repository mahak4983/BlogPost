const jwt = require('jsonwebtoken')

exports.loginUser = (req, res, next) => {
 const userId = req.body.userId;
 const password = req.body.password;

 if(userId!=='VaishaliP' || password!=='Bohemian123'){
     return res.status(401).json({message:'Failed Login'})
 }
   const token = jwt.sign(
       {
           userId: userId
       },
       'somesupersecretsecret',
       { expiresIn: '1h' }
   );
   res.status(200).json({token: token});
}