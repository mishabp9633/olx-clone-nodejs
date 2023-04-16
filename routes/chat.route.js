import {Router} from "express";
import {  
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,} from "../controllers/chatControllers.js"

import { authorizeRoles } from "../middlewares/auth.middleware.js"
import { ROLES } from "../constants/role.constants.js"

const router = Router();
const path = "/chat"

router.post(`${path}/access`, authorizeRoles([ROLES.SELLER]), accessChat);
router.get(`${path}/get`, authorizeRoles([ROLES.SELLER]), fetchChats);
router.post(`${path}/group`, authorizeRoles([ROLES.SELLER]), createGroupChat);
router.put(`${path}/rename`, authorizeRoles([ROLES.SELLER]), renameGroup);
router.put(`${path}/groupremove`, authorizeRoles([ROLES.SELLER]), removeFromGroup);
router.put(`${path}/groupadd`, authorizeRoles([ROLES.SELLER]), addToGroup);

export default router
