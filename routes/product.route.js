import { getAllProduct, saveProduct, 
    getAllProductUserByToken, updateProductDataByToken,
     deleteProductDataByToken ,updateProductPhotoByToken
    } from '../controllers/product.controller.js'

import express from 'express'
import { Delete } from '../services/product.service.js'
import multer from 'multer'

import { role } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js"


const storage = multer.diskStorage({})
const upload = multer({storage})

const router = express.Router()
const path = "/product"

// ...........seller...........//
router.post(`${path}/new`, upload.array('photos'),role.check(ROLES.seller), saveProduct)
router.get(`${path}/seller/all`, role.check(ROLES.seller), getAllProductUserByToken)
router.put(`${path}/seller/update/:id`, role.check(ROLES.seller), updateProductDataByToken)
router.put(`${path}/seller/update/photos/:id`, upload.array('photos'),role.check(ROLES.seller), updateProductPhotoByToken)
router.delete(`${path}/seller/delete/:id`, role.check(ROLES.seller), deleteProductDataByToken)

//...........admin..............//
router.get(`${path}/admin/all`, role.check(ROLES.admin), getAllProduct)
router.delete(`${path}/admin/delete`, role.check(ROLES.admin), Delete)



export default router

