import Booking from "../models/Bookingmodels.js";
import Room from "../models/roomsmodels.js";


// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { roomName, hotelName, userName, toDate, fromDate } = req.body;
        const newBooking = new Booking({ roomName, hotelName, userName, toDate, fromDate });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getBooking = async (req, res) => {
    // Function logic for getting a single booking by ID
};
// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a booking by ID
const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


    export {
        createBooking,
        getBooking,
        getAllBookings,
        getBookingById,
        deleteBooking,
        updateBooking
    };

// import Bookings from "../models/Bookingmodels.js";
// import Room from "../models/roomsmodels.js";



// // New Booking 
// const checkRoomAvailability = (booking) => {
//     debugger;
//     const bookingObj = Bookings.find();
//     //console.log("bookingObj");
//     if (booking.fromDate > bookingObj.toDate) return false;
//     // else if (bookingObj.availability) return true;
//     return true;
// };

// export const booking = async(req, res, next) => {
//     const obj = {};
//     obj.hotelId = req.body.hotelId;
//     obj.roomId = req.body.roomId;
//     obj.fromDate = req.body.fromDate;
//     obj.toDate = req.body.toDate;
//     const response = checkRoomAvailability(obj);

//     try {
//         if (!response) {
//             res.status(200).json({
//                 status: false,
//                 message: `room can't book at this moment`,
//             });
//         }
//         const newBooking = new Bookings(req.body);
//         const savedBooking = await newBooking.save();
//         res.status(200).json({
//             status: true,
//             message: `Room Id  ${obj.roomId} is Booked from ${obj.fromDate} to ${obj.fromDate}`,
//         });
//     } catch (err) {
//         next(err);
//     }
// };


// // Booking List 
// export const bookingList = async(req, res, next) => {
//     try {
//         const list = await Bookings.find();
//         res.status(200).json(list);
//     } catch (err) {
//         next(err);
//     }
// };

// // Booking Search By Id
// export const bookingSearch = async(req, res, next) => {
//     try {
//         const search = await Bookings.findById(req.params.id);
//         res.status(200).json(search);

//     } catch (err) {
//         next(err);
//     }
// };


// export const checkOut = async(req, res, next) => {
//     try {
//         await Bookings.findByIdAndDelete(req.params.id);
//         res.status(200).json("Customer has been CheckOut.");

//     } catch (err) {
//         next(err);
//     }
// };