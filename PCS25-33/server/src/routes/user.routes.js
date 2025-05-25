import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";

const upload = multer(); // for parsing multipart/form-data
const router = Router();

router.route("/register").post(upload.none(), registerUser);
router.route("/login").post(upload.none(), loginUser);

//Secured Routes
router.route("/logout").post(upload.none(), verifyJWT, logoutUser);
router.route("/refresh-token").post(upload.none(), refreshAccessToken);


export default router;