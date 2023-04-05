import express from "express";
import {
  getuser,
  getusers,
  updateData,
  forgot,
  reset,
  getUserByToken,
  updateUserByToken,
  deleteUserByToken,
  deleteUserByAdminData,
} from "../controllers/user.controller.js";

import { userMiddleware } from "../middlewares/user.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";
import { ROLES } from "../constants/role.constants.js";

const router = express.Router();
const path = "/user";

//..............seller..............//
router.post(`${path}/signup`, userMiddleware, userData);
router.post(`${path}/forgotpassword`, forgot);
router.post(`${path}/resetpassword/:id`, reset);
router.get(`${path}/get`, authorizeRoles([ROLES.SELLER,ROLES.ADMIN]), getUserByToken)
router.post(`${path}/update`, authorizeRoles([ROLES.ADMIN,ROLES.SELLER]), updateUserByToken);
router.post(`${path}/delete`, authorizeRoles([ROLES.SELLER]), deleteUserByToken);

//............admin...............//
router.get(`${path}/user-all`, authorizeRoles([ROLES.ADMIN]), getusers);
router.get(`${path}/user-single/:id`, authorizeRoles([ROLES.ADMIN]), getuser);
router.put(`${path}/user-update/:id`, authorizeRoles([ROLES.ADMIN]), updateData);
router.delete(`${path}/user-delete/:id`, authorizeRoles([ROLES.ADMIN]), deleteUserByAdminData);
// router.post(`${path}/admin/get`, authorizeRoles(), getAdminByToken);

export default router;
