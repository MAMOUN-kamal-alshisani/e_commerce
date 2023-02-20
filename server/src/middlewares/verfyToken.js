const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).send("you are not authenticated");
  }

  try {
    const validToken = jwt.verify(token, "secret");

    if (validToken) {
      req.user = User.findOne({ where: { id: validToken.id } });

      next();
    }
  } catch (err) {
    res.send(err.message);
    console.log(err);
  }
  // if(!token){
  //     res.status(404).send('you are not authenticated!')
  // }

  // const decoded = jwt.verify(token,'secret')
  // req.user = await User.findOne({where:{id:decoded.id}})

  // console.log(decoded);
  //    const decoded =await jwt.verify(token,'secret',(err,user)=>{

  //         if(err){
  //         res.status(403).send(err);
  //         }
  //        req.user =  User.findOne({where:{id:decoded.id}})

  //         req.user = user
  //         console.log( req.user);
  //     })

  // next()
}
module.exports = verifyToken;

// function verifyUser(req,res,next){
// const id = req.params.id
//     verifyToken(req,res,next,()=>{
//         if(req.user.id == id){
//             next()
//         }else{
//            res.status(403).send('you are not authorized!')
//         }
//     })
// }

// async function isAuthenticated(req,res,next){

//     const token = req.cookies.user

//     console.log(token);
//     }

// module.exports = isAuthenticated
