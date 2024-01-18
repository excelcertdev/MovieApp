// Imported Movie Model
const movieModel = require('../Models/movieModel.js');
const log = require('../utils/logger.js');

// Create Movie
const addMovie = async (req, res) => {
  const { title, publishingYear } = req.body;
  const user = req.user.id;

  // Check for file filter error
  if (req.fileFilterError) {
    return res
      .status(200)
      .json({ status: false, message: res._('errorImage') });
  }

  try {
    // Check if the movie with the same title already exists
    const existingMovie = await movieModel.findOne({ title });
    if (existingMovie) {
      return res
        .status(200)
        .json({ status: false, message: res.__('movieExists') });
    }

    // Create a new movie
    const movie = new movieModel({
      title,
      publishingYear: Number(publishingYear),
      userId: user,
      poster: req.file.location,
    });

    // Save the movie to the database
    const savedMovie = await movie.save();
    return res.status(200).json({
      status: true,
      message: res.__('addedMovie'),
      data: savedMovie,
    });
  } catch (err) {
    // Log and handle errors
    log.error(`Failed to add movie \n error ${err} `);
    return res.status(500).json({
      status: false,
      message: res.__('server_error'),
      error: err,
    });
  }
};

// Get and Search Movies
const getMovies = async (req, res) => {
  try {
    const { query, offset, limit } = req.body;

    // Create a match query for searching by title
    const matchQuery = query ? { title: { $regex: query, $options: 'i' } } : {};

    // Common aggregation pipeline stages
    const commonPipeline = [
      { $match: matchQuery },
      { $sort: { createdAt: -1 } },
      { $skip: (Number(offset) - 1) * Number(limit) },
    ];

    // Add $limit stage if limit is provided and valid
    if (limit && !isNaN(Number(limit))) {
      commonPipeline.push({ $limit: Number(limit) });
    } else {
      return res
        .status(200)
        .json({ status: false, message: res.__('provide_limit') });
    }

    const movies = await movieModel.aggregate(commonPipeline);
    const totalMovies = await movieModel.find(matchQuery).countDocuments();
    const pages = Math.ceil(totalMovies / limit);

    // Handle case when no movies are found
    if (movies.length <= 0) {
      return res.status(200).json({
        status: false,
        message: res.__('record_not_found'),
        movies: movies,
      });
    }

    // Return the response with found movies and pagination information
    return res.status(200).json({
      status: true,
      message: res.__('record_found'),
      movies: movies,
      pages,
    });
  } catch (err) {
    // Log and handle errors
    log.error(`Failed to fetch movies \n error ${err} `);
    return res
      .status(500)
      .json({ status: false, message: res.__('server_error') });
  }
};

// Update Movie
const updateMovie = async (req, res) => {
  const { movieId, title, publishingYear } = req.body;
  let movie;

  // Check for file filter error
  if (req.fileFilterError) {
    return res
      .status(200)
      .json({ status: false, message: res._('errorImage') });
  }

  try {
    // Find the movie by ID
    movie = await movieModel.findOne({ _id: movieId });
    if (!movie) {
      return res.status(200).json({
        status: false,
        message: res.__('movienotfound'),
      });
    }

    // Update the movie
    const updatedMovie = await movieModel.findOneAndUpdate(
      { _id: movieId },
      {
        $set: {
          title,
          publishingYear: Number(publishingYear),
          poster: req.file ? req.file.location : movie.poster,
        },
      },
      { new: true }
    );

    // Return the response with the updated movie
    return res.status(200).json({
      status: true,
      message: res.__('success_update'),
      data: updatedMovie,
    });
  } catch (err) {
    // Log and handle errors
    log.error(`Failed to update movie \n error ${err} `);
    return res.status(500).json({
      status: false,
      message: res.__('server_error'),
      error: err.message,
    });
  }
};

// Delete Movie by Movie ID
const deleteMovie = async (req, res) => {
  const { movieId } = req.body;

  try {
    // Delete the movie by ID
    const deletedMovie = await movieModel.findByIdAndDelete(movieId);

    // Handle case when movie is not found
    if (!deletedMovie) {
      return res
        .status(200)
        .json({ status: false, message: res.__('record_not_found') });
    }

    // Return success response after deleting the movie
    return res
      .status(200)
      .json({ status: true, message: res.__('success_delete') });
  } catch (err) {
    // Log and handle errors
    log.error(`Failed to delete movie \n error ${err}`);
    return res
      .status(500)
      .json({ status: false, message: res.__('server_error'), data: err });
  }
};

// Get Movie by ID
const getMovieById = async (req, res) => {
  const movieId = req.query.movieId;

  try {
    // Find the movie by ID
    const movieData = await movieModel.findOne({ _id: movieId });

    // Handle case when movie is not found
    if (!movieData) {
      return res
        .status(200)
        .json({ status: false, message: res.__('movienotfound') });
    }

    // Return the response with the found movie data
    return res.status(200).json({
      status: true,
      message: res.__('record_found'),
      data: movieData,
    });
  } catch (err) {
    // Handle errors
    return res.status(500).json({
      status: false,
      message: res.__('server_error'),
      error: err.message,
    });
  }
};

// Export the controller functions
module.exports = {
  addMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  getMovieById,
};
