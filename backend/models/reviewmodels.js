import mongoose from 'mongoose'

// Define a schema for the 'User' model
const commentSchema = new mongoose.Schema({

  // Field for the user's email
  userName: {
    type: String,
    required: true,
    
  },

  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },



});

// Create the 'User' model based on the schema

export default mongoose.model("Comment", commentSchema);


