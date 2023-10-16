import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  distance: {
    type: String,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: Array,
  },
  cheapestPrice: {
    type: Number,
  },
  featured: {
    type: Boolean,
  },
});

export default mongoose.model("Hotel", HotelSchema)
    // name: {
    //     type: String,
    //     required: true,
    //   },
    //   type: {
    //     type: String,
    //     required: true,
    //   },
    //   city: {
    //     type: String,
    //     required: true,
    //   },
    //   address: {
    //     type: String,
    //     required: true,
    //   },
    //   distance: {
    //     type: String,
    //     required: true,
    //   },
    //   photos: {
    //     type: [String],
    //   },
    //   title: {
    //     type: String,
    //     required: true,
    //   },
    //   desc: {
    //     type: String,
    //     required: true,
    //   },
    //   rating: {
    //     type: Number,
    //     min: 0,
    //     max: 5,
    //   },
    //   rooms: {
    //     type: [String],
    //   },
    //   cheapestPrice: {
    //     type: Number,
    //     required: true,
    //   },
    //   featured: {
    //     type: Boolean,
    //     default: false,
    //   },
    // });

// export default mongoose.model("Hotel", HotelSchema)