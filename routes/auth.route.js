import express from "express";
import {
  signIn,
  logoutUser,
  googleLogin,
} from "../controllers/auth.controller.js";
import { loginValidator } from "../middlewares/login.validation.middleware.js";

const router = express.Router();
const path = "/auth";

//........user login and log out...........//
router.post(`${path}/user-signin`, loginValidator, signIn);
router.post(`${path}/user-logout`, logoutUser);

//.........google sign in.........//
router.post(`${path}/user/google/signin`, googleLogin);

export default router;
