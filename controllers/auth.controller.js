import { getProfileInfo, login } from "../services/auth.service.js";
import { OAuth2Client } from 'google-auth-library';


//login 
export async function signIn(req, res, next) {
  
    const loginData = req.body
  
    try {
      const response = await login(loginData)
      res.status(200).send(response);
      }
    catch (err) {
      console.log(err);
      next(err);
    } 
} 


export async function logoutUser(req, res, next) {
  try {
      res.cookie('x-auth-token')
      res.status(200).send({ message: 'Successfully logged out' });
  
  } catch (err) {
    console.log(err);
    next(err);
  }
}



export async function googleLogin(req, res) {

  const CLIENT_ID = process.env.CLIENT_IDD
  const client = new OAuth2Client(CLIENT_ID);

  const { idToken } = req.body
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID2,
    })

    const payload = ticket.getPayload()
    const { sub: googleId } = payload
    const googleUser = await getProfileInfo(payload['sub']);
    res.json({ googleId, googleUser })
  } catch (error) {
    console.error(error);
    res.status(401).send('Invalid token')
  }
};
