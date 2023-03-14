import userModel from '../models/user.model.js'
import googleUserModel from '../models/googleuser.mode.js'
import { google } from 'googleapis'


import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {HttpException} from '../exceptions/exceptions.js';

export async function login(loginData){
   const user = await  userModel.findOne({username:loginData.username})
   
   console.log("user: ", user);

   if (!user) 
    throw new HttpException(404, "username or password is invalid");
   

     const validpassword = await bcrypt.compare(loginData.password, user.password);
     console.log("validpassword :", validpassword);

     if (!validpassword)
     throw new HttpException(404, "username or password is invalid");
     
     let token = jwt.sign(
       { _id: user._id },
       process.env.TOKEN_KEY
     ); 
     let tokenRole={
      role:user.role,
      token
     }
     return {tokenRole}
}



//google sign in
export async function getProfileInfo(accessToken) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken,
  });
  const people = google.people({
    version: 'v1',
    auth: oauth2Client,
  });
  const { data } = await people.people.get({
    resourceName: 'people/me',
    personFields: 'names,photos,emails'
  })

  const name = data.names[0].displayName;
  const photoUrl = data.photos[0].url;
  const email = data.email[0].emails
  const user = await googleUserModel.create({name:name,email:email,photoUrl:photoUrl})

  let token = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_KEY
  ); 
 let tokenRoleUser={
  role:user.role,
  token,
  user
  }
  return { tokenRoleUser }

}