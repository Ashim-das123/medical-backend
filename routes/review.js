import express from "express"
import { getAllReviews, createReview } from "../controllers/review-controller.js";
import { authenticate, restrict } from "../auth/verifyToken.js"


const router = express.Router({ mergeParams: true })

// Define the route with chained methods
router.route('/')
    .get(getAllReviews)
    .post(authenticate, restrict(["patient"]), createReview)


export default router;

