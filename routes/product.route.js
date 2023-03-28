import { getAllProduct, saveProduct, 
    getAllProductUserByToken, updateProductDataByToken,
     deleteProductDataByToken ,updateProductPhotoByToken,
     getSingleProduct,
     deleteProduct
    } from '../controllers/product.controller.js'

import express from 'express'
import { Delete } from '../services/product.service.js'
import multer from 'multer'

import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js"


const storage = multer.diskStorage({})
const upload = multer({storage})

const router = express.Router()
const path = "/product"

// ...........seller...........//
router.post(`${path}/new`, upload.array('photos'), authorizeRoles([ROLES.SELLER]), saveProduct)
router.get(`${path}/seller/all`, authorizeRoles([ROLES.ADMIN,ROLES.SELLER]), getAllProductUserByToken)
router.get(`${path}/seller/all/:id`, authorizeRoles([ROLES.ADMIN,ROLES.SELLER]), getSingleProduct)
router.put(`${path}/seller/update/:id`, authorizeRoles([ROLES.ADMIN,ROLES.SELLER]), updateProductDataByToken)
router.put(`${path}/seller/update/photos/:id`, upload.array('photos'),authorizeRoles([ROLES.ADMIN,ROLES.SELLER]), updateProductPhotoByToken)
router.delete(`${path}/seller/delete/:id`, authorizeRoles([ROLES.SELLER]), deleteProductDataByToken)

//...........admin..............//
router.get(`${path}/admin/all`, authorizeRoles([ROLES.ADMIN,ROLES.SELLER]), getAllProduct)
router.delete(`${path}/admin/delete/:id`, authorizeRoles([ROLES.ADMIN]), deleteProduct)

export default router

