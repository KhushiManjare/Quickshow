import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    tmdbId: { type: Number, unique: true },
    title: String,
    overview: String,
    poster_path: String,
    backdrop_path: String,
    release_date: String,
    vote_average: Number,
    vote_count: Number,
    popularity: Number,
    runtime: Number,
    genres: Array,
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
