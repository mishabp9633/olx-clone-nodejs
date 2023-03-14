import express from "express"

import { getAllCategory,
         saveCategory,
         updateCategory,
         deleteCategory
 } from "../controllers/category.controller.js"

import { role } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js"
import { categoryValidator } from "../middlewares/category.validator.js"


const router = express.Router()
const path = "/category"

//..........admin............//
router.post(`${path}/new`, role.check(ROLES.admin), categoryValidator, saveCategory);
router.post(`${path}/new`,role.check(ROLES.admin), categoryValidator, saveCategory)
router.put(`${path}/update/:id`,role.check(ROLES.admin), updateCategory)
router.delete(`${path}/delete/:id`,role.check(ROLES.admin), deleteCategory)

// // ........admin and seller.........//
router.get(`${path}/all`,role.check(ROLES.admin),getAllCategory)

export default router