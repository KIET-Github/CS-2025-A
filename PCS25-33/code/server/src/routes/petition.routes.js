import { Router } from "express"
import {
    createPetition,
    upvotePetition,
    getPetitionById,
    getAllPetitons,
    editPetition,
    deletePetition
} from "../controllers/petition.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";

const upload = multer(); // for parsing multipart/form-data
const router = Router()


// USER ROUTES
router.route("/create").post(upload.none(), verifyJWT, createPetition)
router.route("/edit/:id").put(upload.none(), verifyJWT, editPetition)
router.route("/delete/:id").delete(upload.none(), verifyJWT, deletePetition)

// ADMIN ROUTES
router.route("/archive").get(upload.none(), verifyJWT, getAllPetitons)
router.route("/upvote/:id").post(upload.none(), verifyJWT, upvotePetition)
router.route("/details/:id").get(upload.none(), verifyJWT, getPetitionById)

export default router