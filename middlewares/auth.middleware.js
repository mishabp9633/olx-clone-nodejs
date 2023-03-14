import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";


export const role = {
  check:
    (...roles) =>
    async (req, res, next) => {
      const token =
        (req.header("Authorization") &&
          req.header("Authorization").split("Bearer ")[1]) ||
        null;

      if (!token) {
        return res
          .status(401)
          .send({ message: "Access denied. No token provided" });
      }

      try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await userModel.findOne({ _id: decoded._id });

        if (!user) {
          return res.status(400).send({ message: "Invalid user" });
        }

        const authorizedRole = roles.find((role) =>
          Array.isArray(role) ? role.includes(user.role) : user.role === role
        );

        if (!authorizedRole) {
          return res
            .status(403)
            .send({ message: "Access denied. Not an authorized role" });
        }

        req.body.user = user;
        next();
      } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Invalid token" });
      }
    },
};

// //single checking
// export async function roleCheckMiddleware(req, res, next) {
//     const token = req.header('Authorization') && req.header('Authorization').split('Bearer ')[1] || null;
//     if (!token) {
//         return res.status(401).send({ message: "Access denied. No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.TOKEN_KEY);
//         const user = await userModel.findOne({ _id: decoded._id });
//         if (!user) {
//             return res.status(400).send({ message: 'Invalid user' });
//         }
//         switch (user.role) {
//             case 'seller':
//                 case 'admin':
//                 req.body.user = user;
//                 next();
//                 break;
//             default:
//                 // return res.status(403).send({ message: 'Access denied. Not an authorized role' });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(400).send({ message: "Invalid token" });
//     }
// }

// const check =(...roles)=>(req, res, next)=>{
//     if(!req.body.user){
//         return res.status(401).send({message:'Unauthorized'})
//     }

//     console.log(req.body.user)

//     const hashRole = roles.find(role => Array.isArray(role)
//     ? role.includes(req.body.user.role)
//     : req.body.user.role === role)

//     // const hashRole = roles.find(role=> req.body.user.role === role)
//     if(!hashRole){
//         return res.status(403).send({message:"Access denied. Not an authorized role"})
//     }
// return next()
// }

// export const role = { check }
