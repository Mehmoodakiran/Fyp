import Hotel from "../models/hotelmodels.js";
import Room from "../models/roomsmodels.js";
import upload from "../utils/multer.js";

export const createHotel = async (req, res, next) => {
  try {
    upload.single('photos')(req, res, async function(error){
      if (error) {
        console.error("error uploadeing image: ", error);
        return res.status(404).send({ error: "error uploadeing image" })
      }
      // res.send("File uploaded successfully.");
    })
    console.log("API Called");
    try {
      const photo = req.file.path;
      console.log(photo)

      const {
        name,
        type,
        city,
        address,
        distance,
        title,
        desc,
        rating,
        rooms,
        cheapestPrice,
        featured,
      } = req.body;

      console.log("Request Body : ", req.body);
      console.log("Request File : ", photo);

      const newHotel = new Hotel({
        name,
        type,
        city,
        address,
        distance,
        photos: [photo],
        title,
        desc,
        rating,
        rooms,
        cheapestPrice,
        featured,
      });

      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (err) {
      console.error("Error in creating Hotel:", err); // Log the error for debugging
      next(err);
    }
  } catch (err) {
    console.error("Error in createHotel:", err); // Log the error for debugging
    next(err);
  }
};

// export const updateHotel = async (req, res, next) => {
//   try {
//     const updatedHotel = await Hotel.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedHotel);
//   } catch (err) {
//     next(err);
//   }
// };
// export const deleteHotel = async (req, res, next) => {
//   try {
//     await Hotel.findByIdAndDelete(req.params.id);
//     res.status(200).json("Hotel has been deleted.");
//   } catch (err) {
//     next(err);
//   }
// };
// export const getHotel = async (req, res, next) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     res.status(200).json(hotel);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getHotels = async (req, res, next) => {

//   const { min, max, limit } = req.query;
//   const filter = {}
//   // console.log("log",min,max,limit)
//   try {
//     if (min || max || limit) {
//       const hotels = await Hotel.find({
//         cheapestPrice: { $gt: min | 1, $lt: max || 10000 },
//       }).limit(req.query.limit);
//       res.status(200).json(hotels);

//     } else {
//       const hotels = await Hotel.find()
//       res.status(200).json(hotels);
//     }


//   } catch (err) {
//     next(err);
//   }
// };


// export const countByCity = async (req, res, next) => {
//   const cities = req.query.cities.split(",");
//   try {
//     const list = await Promise.all(
//       cities.map((city) => {
//         return Hotel.countDocuments({ city: city });
//       })
//     );
//     res.status(200).json(list);
//   } catch (err) {
//     next(err);
//   }
// };
// export const countByType = async (req, res, next) => {
//   try {
//     const hotelCount = await Hotel.countDocuments({ type: "hotel" });
//     const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
//     const resortCount = await Hotel.countDocuments({ type: "resorts" });
//     const villaCount = await Hotel.countDocuments({ type: "villas" });
//     const cabinCount = await Hotel.countDocuments({ type: "cabins" });

//     res.status(200).json([
//       { type: "hotel", count: hotelCount },
//       { type: "apartments", count: apartmentCount },
//       { type: "resorts", count: resortCount },
//       { type: "villas", count: villaCount },
//       { type: "cabins", count: cabinCount },
//     ]);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getHotelRooms = async (req, res, next) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     const list = await Promise.all(
//       hotel.rooms.map((room) => {
//         return Room.findById(room);
//       })
//     );
//     res.status(200).json(list)
//   } catch (err) {
//     console.log("errr", err)
//     next(err);
//   }
// };
// import Hotel from "../models/hotelmodels.js";
// import Room from "../models/roomsmodels.js";

// export const createHotel = async (req, res, next) => {
//     const newHotel = new Hotel(req.body);
  
//     try { 
//       const savedHotel = await newHotel.save();
//       res.status(200).json(savedHotel);
//     } catch (err) {
//       next(err);
//     }
//   };
  export const updateHotel = async (req, res, next) => {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedHotel);
    } catch (err) {
      next(err);
    }
  };
  export const deleteHotel = async (req, res, next) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json("Hotel has been deleted.");
    } catch (err) {
      next(err);
    }
  };
  export const getHotel = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  };
  // export const getHotels = async (req, res, next) => {
  //   const { min, max, ...others } = req.query;
  //   try {
  //     const hotels = await Hotel.find({
  //       ...others,
  //       cheapestPrice: { $gt: min | 1, $lt: max || 999 },
  //     }).limit(req.query.limit);
  //     res.status(200).json(hotels);
  //   } catch (err) {
  //     next(err);
  //   }
  // };
  export const getHotels = async (req, res, next) => {
    
    const { min, max,limit} = req.query;
    const filter ={}
    // console.log("log",min,max,limit)
    try {
      if(min || max || limit){
        const hotels = await Hotel.find({
          cheapestPrice: { $gt: min | 1, $lt: max || 999 },
        }).limit(req.query.limit);
        res.status(200).json(hotels);
       
      }else{
        const hotels = await Hotel.find()
        res.status(200).json(hotels);
      }
     
    
    } catch (err) {
      next(err);
    }
  };


  export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };
   export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "lexury" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };
  
  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      console.log("errr",err)
      next(err);
    }
  };