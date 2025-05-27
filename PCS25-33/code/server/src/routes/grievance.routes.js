import {
    submitGrievance,
    getGrievanceCounts,
    respondToGrievance,
    getAllGrievances,
    getUserGrievances,
    getPendingGrievances,
    getGrievanceById,
    editGrievance,
    deleteGrievance
} from "../controllers/grievance.controller.js"

import { Router } from "express"
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import multer from "multer";

const upload = multer(); // for parsing multipart/form-data
const router = Router()

// USER ROUTES
router.route("/create").post(upload.none(), verifyJWT, submitGrievance);
router.route("/currentuser").get(upload.none(), verifyJWT, getUserGrievances);
router.route("/details/:id").get(upload.none(), verifyJWT, getGrievanceById);
router.route("/delete/:id").delete(upload.none(), verifyJWT, deleteGrievance);
router.route("/edit/:id").put(upload.none(), verifyJWT, editGrievance);


//ADMIN ROUTES
router.route("/count").get(upload.none(), verifyAdmin, getGrievanceCounts);
router.route("/:id/mark-as-resolved").put(upload.none(), verifyAdmin, respondToGrievance);
router.route("/archive").get(upload.none(), verifyAdmin, getAllGrievances);
router.route("/pending").get(upload.none(), verifyAdmin, getPendingGrievances);

export default router;