// const { body, validationResult } = require('express-validator');



// function validator(req,res,next){

//     body('Email').trim().isEmail().withMessage('input must be a valid email!'),
//     // password must be at least 5 chars long
//     body('Password').isLength({ min: 6 }).withMessage('password should be at least 6 charcters long!')

// }



// module.exports = validator



// const validate = validations => {
//     return async (req, res, next) => {
//         await Promise.all(validations.map(validation => validation.run(req)));

//         const errors = validationResult(req);
//         if (errors.isEmpty()) {
//             return next();
//         }

//         res.status(400).json({
//             errors: errors.array()
//         });
//     };
// };


// module.exports = validate


// [
//     body("Email").trim().isEmail().withMessage("input must be a valid email!"),
//     // password must be at least 5 chars long
//     body("Password")
//       .isLength({ min: 6 })
//       .withMessage("password should be at least 6 charcters long!"),
      
//   ],



