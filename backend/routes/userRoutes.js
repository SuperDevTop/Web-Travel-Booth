import express from 'express'
import { 
  registerUser,
  authUser,
  allUsers,
  GetUserById,
  updateProfile,
  updateAdminProfile,
  postForgotPassword,
  emailVerify,
  emailReverify,
  getAdmin,
} from '../controllers/userControllers.js'

import { protect } from "../middleware/authMiddleware.js";
import { emailVerifyProtect } from '../middleware/emailVerifyMiddleware.js';

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.route("/admin").get(getAdmin);
router.route("/:id").get(GetUserById);
router.route("/update/:id").put(updateProfile);
// router.post("/login", authUser);
router.route('/login').post(emailVerifyProtect, authUser);
router.put("/updateadmin", updateAdminProfile);
router.post("/forgotPassword", postForgotPassword);
router.post("/emailverify", emailVerify);
router.post("/emailreverify", emailReverify);



export default router;
