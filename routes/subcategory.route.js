import express from "express";

import {
  getAllSubcategory,
  saveSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategory.controller.js";

import { subcategoryValidator } from "../middlewares/subcategory.validator.js";
import { role } from "../middlewares/auth.middleware.js";
import { ROLES } from "../constants/role.constants.js";

const router = express.Router();
const path = "/subcategory";

// ..........admin............//
router.post(
  `${path}/new`,
  subcategoryValidator,
  role.check(ROLES.admin),
  saveSubcategory
);
router.put(`${path}/update/:id`, role.check(ROLES.admin), updateSubcategory);
router.delete(`${path}/delete/:id`, role.check(ROLES.admin), deleteSubcategory);

//........admin and seller.........//
router.get(`${path}/all`, role.check(ROLES.admin_seller), getAllSubcategory);

export default router;
