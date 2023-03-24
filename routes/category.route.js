import express from "express"

import { getAllCategory,
         saveCategory,
         updateCategory,
         deleteCategory
 } from "../controllers/category.controller.js"

import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js"
import { categoryValidator } from "../middlewares/category.validator.js"


const router = express.Router()
const path = "/category"

//..........admin............//
router.post(`${path}/new`, authorizeRoles([ROLES.ADMIN]), categoryValidator, saveCategory);
router.put(`${path}/update/:id`,authorizeRoles([ROLES.ADMIN]), updateCategory)
router.delete(`${path}/delete/:id`,authorizeRoles([ROLES.ADMIN]), deleteCategory)

// // ........admin and seller.........//
router.get(`${path}/all`,authorizeRoles([ROLES.ADMIN]),getAllCategory)

export default router