
import { Router } from 'express';
import multer from 'multer'
import { ROLES } from '../constants/role.constants';
import { createProductImage, deleteProductImage, updateProductImage } from '../controllers/productImage.controller';
import { authorizeRoles } from "../middlewares/auth.middleware.js"

const storage = multer.diskStorage({})
const upload = multer({storage})

const ProductImageRoute = Router()
const path = "/productImage"


   // admin
    // router.get(`${path}/admin/all`, authorizeRoles([ROLE.ADMIN, ROLE.USER]), productImageController.getProductImages);
    // router.get(`${path}/admin/:id`, authorizeRoles([ROLE.ADMIN, ROLE.USER]), productImageController.getProductImageById);
    ProductImageRoute.post(`${path}/admin/new/:id`,upload.array("photo"), authorizeRoles([ROLES.SELLER]), createProductImage);
    ProductImageRoute.post(`${path}/admin/update/:id`,upload.array("photo"), authorizeRoles([ROLES.SELLER]), updateProductImage);
    ProductImageRoute.delete(`${path}/admin/delete/:productId`, authorizeRoles([ROLES.SELLER]), deleteProductImage);
  


export default ProductImageRoute;