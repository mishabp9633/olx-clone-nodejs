import express from "express";
import {
  getuser,
  getusers,
  updateData,
  deleteData,
  userData,
  forgot,
  reset,
  getUserByToken,
  updateUserByToken,
  getAdminByToken,
  deleteUserByToken,
} from "../controllers/user.controller.js";

import { userMiddleware } from "../middlewares/user.middleware.js";
import { role } from "../middlewares/auth.middleware.js";
import { ROLES } from "../constants/role.constants.js";

const router = express.Router();
const path = "/user";

//..............seller..............//
router.post(`${path}/signup`, userMiddleware, userData);
router.post(`${path}/forgotpassword`, role.check(ROLES.seller), forgot);
router.post(`${path}/resetpassword/:id`, role.check(ROLES.seller), reset);
router.post(`${path}/get`, role.check(ROLES.seller), getUserByToken);
router.post(`${path}/update`, role.check(ROLES.seller), updateUserByToken);
router.post(`${path}/delete`, role.check(ROLES.seller), deleteUserByToken);

//............admin...............//
router.get(`${path}/user-all`, role.check(ROLES.admin), getusers);
router.get(`${path}/user-single/:id`, role.check(ROLES.admin), getuser);
router.put(`${path}/user-update/:id`, role.check(ROLES.admin), updateData);
router.delete(`${path}/user-delete/:id`, role.check(ROLES.admin), deleteData);
router.post(`${path}/get`, role.check(ROLES.admin), getAdminByToken);

export default router;
