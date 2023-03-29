import userModel from "../models/user.model.js"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import crypto from 'crypto'
import createError from "http-errors"
import {HttpException} from '../exceptions/exceptions.js';



export async function save (userdata){
       const user = await userModel.findOne({username:userdata.username})
       if(user){
        throw createError(400, 'User already registerd')
       }
      const password = userdata.password
      const confirmPassword = userdata.confirmPassword

  const salt = await bcrypt.genSalt(10);
  const Password = await bcrypt.hash(password,salt)
  const ConfirmPassword = await bcrypt.hash(confirmPassword,salt)

  userdata.password=Password
  userdata.confirmPassword=ConfirmPassword
        const result = new userModel(userdata)
       await result.save()
        return {result}
    
}


export async function getAllData (){
    const result =await userModel.find()
    return {result}
}

export async function getDataUserByToken (){
  const result = await userModel.find({_id:id})
  if(!result)throw new HttpException (404,"User not found by the given Token")
  return {result}
}

export async function getDataAdminByToken (id){
  const result =await userModel.find({_id:id})
  if(!result)throw new HttpException (404,"Admin not found by the given Token")
  return {result}
}


export async function getSingleData(id){
    const result = await userModel.findById(id)
    return {result}
}


export async function update(userId,userdata){
    const result = await userModel.findByIdAndUpdate(userId,userdata,
    
    {
        new:true
    })
return {result}
}


export async function Delete (id){
    const result = await userModel.findByIdAndDelete(id)
    return {result}
}


export async function forgotPassword(email,CLIENT_ID,CLIENT_SECRETE,accessToken,REFRESH_TOKEN){
    const user = await userModel.findOne({email}) 

    const token = crypto.randomBytes(20).toString('hex');
    const frontendURl = 'http://localhost:3000'
    const resetLink = `${frontendURl}/resetpassword/${token}`;

    // if (!user){
    //     res.status(400).send({message:'user not found'})
    // }
 
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          type: 'OAuth2',
          user: 'mishabp9633@gmail.com',
          clientId:CLIENT_ID,
          clientSecret:CLIENT_SECRETE,
          refreshToken:REFRESH_TOKEN,
          accessToken: accessToken
      }
  });

    const mailOptions = {
        from: 'mishabp9633@gmail.com',
        to: user.email,
        subject: 'Password Reset',
        html: `<p>Please click <a href="${resetLink}">here</a> to reset your password</p>`
    }

    // Generate a unique token and send password reset link via email

   

    
 const result = transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Password reset email sent: ${info.response}`);
      }
    });
    return {result}
  } 


export async function resetPassword(password,confirmPassword,token){
      // Check if the token is valid and has not expired


      const user = await userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });

      const salt = await bcrypt.genSalt(10);
      const Password = await bcrypt.hash(password,salt)
      const ConfirmPassword = await bcrypt.hash(confirmPassword,salt)

          // Update the user's password    
    user.password = Password;
    user.confirmPassword=ConfirmPassword
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

return {user}
}