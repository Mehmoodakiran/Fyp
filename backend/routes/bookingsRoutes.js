// bookingsRoutes.js

import express from 'express';
import {
    createBooking,
    deleteBooking,
    getBooking,
    getAllBookings,
    updateBooking,
} from "../controllers/bookingsController.js";

import {verifyToken,  verifyUser} from "../utils/verifyToken.js";

const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;


// import express from "express";
// import { booking, bookingList, bookingSearch, checkOut } from "../controllers/bookingsController.js";
// import { verifyUser } from "../utils/verifyToken.js";
// const router = express.Router();

// //Check In
// router.post("/", verifyUser, booking);

// // //Booking List
// router.get("/", verifyUser, bookingList);

// // //Search Booking By Id
// router.get("/search/:id", verifyUser, bookingSearch);

// // //Check Out
// router.delete("/checkout/:id",  checkOut);

// export default router;