// reviewRoutes.js
import express from "express";
import { createReview, getReviews } from '../controllers/reviewController.js';

const router = express.Router();

// Create a new review
router.post('/:id', createReview);

// Get all reviews
router.get('/:id', getReviews);

export default router;
