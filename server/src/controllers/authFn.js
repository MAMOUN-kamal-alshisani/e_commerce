const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// function createToken(id) {
//   return jwt.sign({ id: id }, "secret");
// }

// async function signup(req, res) {
//   /// input validation
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { Username, Email, Password } = req.body;
//     const genSalt = bcrypt.genSaltSync(16);
//     const hashedPassword = bcrypt.hashSync(Password, genSalt);

//     // const hashedPassword =
//     const user = await User.create({
//       Username: Username,
//       Email: Email,
//       Password: hashedPassword,
//     });
//     // create jwt
//     const token = createToken(user.id);
//     // console.log(token);
//     return res
//       .cookie("user", token /*{maxAge:10000}*/)
//       .status(200)
//       .send({ token: token ,user:user});
//     // res.status(201).json({ user });
//   } catch (err) {
//     console.log(err);
//     res.status(404).send(err.message);
//   }
// }

// async function signin(req, res) {
//   const { Username, Email, Password } = req.body;

//   try {
//     const user = await User.findOne({ where: { Email } });

//     if (!user) return res.status(500).send("email is incorrect");

//     // if(user){

//     //   await User.findOne({ where: { Username } })
//     // }

//     const validPass = await bcrypt.compare(Password, user.Password);
//     if (!validPass) return res.status(500).send("password is incorrect");

//     const token = createToken(user.id);

//     await res.cookie("user", token).status(200).send({ user: token });
//   } catch (err) {
//     console.log(err);

//     res.status(404).send(err.message);
//   }
// }

// module.exports = { signup, signin };


function createToken(id) {
  return jwt.sign({ id: id }, "secret");
}

async function signup(req, res) {
  /// input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { Username, Email, Password } = req.body;
    const genSalt = bcrypt.genSaltSync(16);
    const hashedPassword = bcrypt.hashSync(Password, genSalt);

    // const hashedPassword =
    const EmailUser = await User.findOne({ where: { Email } });
if(EmailUser){
let errors = []
errors.push({msg:'email is already in use'})
 return res.status(500).send({errors})
}
    const user = await User.create({
      Username: Username,
      Email: Email,
      Password: hashedPassword,
    });
    // create jwt
    const token = createToken(user.id);
    // console.log(token);
    return res
      .cookie("token", token  ,{httpOnly:true} /*{maxAge:10000}*/)
      .status(200)
      .send({ token: token ,user:user});
    // res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function signin(req, res) {
  const { Email, Password } = req.body;

  try {
    const user = await User.findOne({ where: { Email } });

    if (!user) return res.status(404).send("email is incorrect");

    const validPass = await bcrypt.compare(Password, user.Password);
    if (!validPass) return res.status(404).send("password is incorrect");

    const token = createToken(user.id);
   await res.cookie('token', token,{
      httpOnly:true,
      maxAge:1000 * 60 * 60* 24
    }).status(200).send({token, user:{id:user.id,username:user.Username,email:user.Email}})



  } catch (err) {
    console.log(err);

    res.status(404).send(err.message);
  }
}

module.exports = { signup, signin };







