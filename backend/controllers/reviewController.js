// reviewController.js
import Hotel from "../models/hotelmodels.js";
import Comment from "../models/reviewmodels.js"
// Controller to create a new review
export const createReview = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const { userName , text } = req.body;
    console.log('In Review Controller')
    const comment = new Comment({
      userName,
      text,
    })

    await comment.save();

    const hotel = await Hotel.findById(hotelId);
    hotel.comments.push(comment._id)
    await hotel.save();
    console.log(hotel)

    res.status(201).json('Comment Saved Successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get all reviews
export const getReviews = async (req, res) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findById(id).populate('comments')
    

    res.status(200).json(hotel.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  createReview,
  getReviews,
  // Add other exported controllers here
};
