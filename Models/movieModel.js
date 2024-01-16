import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publishingYear: {
    type: Number,
    required: true,
  },
  poster: {
    type: String,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
}, { timestamps: true });

const MovieModel = mongoose.model("movie", movieSchema);

export default MovieModel;
