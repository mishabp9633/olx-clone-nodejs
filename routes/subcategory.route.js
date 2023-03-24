import express from "express";

import {
  getAllSubcategory,
  saveSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategory.controller.js";

import { subcategoryValidator } from "../middlewares/subcategory.validator.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";
import { ROLES } from "../constants/role.constants.js";

const router = express.Router();
const path = "/subcategory";

// ..........admin............//
router.post(
  `${path}/new`,
  subcategoryValidator,
  authorizeRoles([ROLES.ADMIN]),
  saveSubcategory
);
router.put(`${path}/update/:id`, authorizeRoles([ROLES.ADMIN]), updateSubcategory);
router.delete(`${path}/delete/:id`, authorizeRoles([ROLES.ADMIN]), deleteSubcategory);

//........admin and seller.........//
router.get(`${path}/all`, authorizeRoles([ROLES.ADMIN,ROLES.SELLER]), getAllSubcategory);

export default router;
