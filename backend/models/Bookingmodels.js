import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
    },
    hotelName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    // maxPeople: {
    //     type: Number,
    //     required: true,
    // },
    // price: {
    //     type: Number,
    //     required: true,
    // },
    toDate: {
        type: Date,
        required: true,
    },
    fromDate: {
        type: Date,
        required: true,
    },
});

export default mongoose.model('Booking', BookingSchema);

// import mongoose from "mongoose";
// const BookingSchema = new mongoose.Schema({
//     hotelId: {
//         type: String,
//         required: true,
//     },
//     roomId: {
//         type: String,
//         required: true,
//     },
//     toDate: {
//         type: Date,
//         required: true,
//     },
//     fromDate: {
//         type: Date,
//         required: true,
//     },
// });

// export default mongoose.model("Booking", BookingSchema);