import express from 'express'

import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js"
import { getAllCount } from '../controllers/static.controller.js'


const router = express.Router()
const path = "/count"

// ...........seller...........//
router.get(`${path}/all`, authorizeRoles( [ROLES.ADMIN] ), getAllCount)

export default router