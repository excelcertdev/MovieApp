// Imported Movie Model
import movieModel from "../Models/movieModel.js";

// Create Movie
const addMovie = async (req, res) => {
  const { title, publishingYear } = req.body;
  const user = req.user.id;

  if (req.fileFilterError) {
    return res.status(200).json({ status: false, message: res._('errorImage') });
  }

  try {
    const existingMovie = await movieModel.findOne({ title });

    if (existingMovie) {
      return res.status(200).json({ status: false, message: res.__('movieExists') });
    }

    const movie = new movieModel({
      title,
      publishingYear:Number(publishingYear),
      userId: user,
      poster: req.file.location,
    });

    const savedMovie = await movie.save();
    return res.status(200).json({ status: true, message: res.__('addedMovie'), data: savedMovie });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: res.__('server_error'), error: err });
  }
};

// Get and search movies created by a particular user
const getMovies = async (req, res) => {
  const { filter, offset, limit } = req.body;
  const filterArray = [];

  if (filter.title) {
    filterArray.push({ 'title': { $regex: filter.title, $options: 'i' } });
  }

  if (filter.publishingYear) {
    filterArray.push({ 'publishingYear': { $eq: Number(filter.publishingYear) } });
  }

  let query = {};
  if (filterArray.length > 0) {
    query = { $and: filterArray };
  }

  try {
    const aggregationPipeline = [
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: (Number(offset) - 1) * Number(limit) },
    ];

    if (limit && !isNaN(Number(limit))) {
      aggregationPipeline.push({ $limit: Number(limit) });
    } else {
      return res.status(200).json({ status: false, message: res.__('provide_limit') });
    }

    const movies = await movieModel.aggregate(aggregationPipeline);
    const totalMovies = await movieModel.countDocuments(query);
    const pages = Math.ceil(totalMovies / limit);

    if (movies.length <= 0) {
      return res.status(200).json({ status: false, message: res.__('record_not_found'), movies: movies });
    }

    return res.status(200).json({ status: true, message: res.__('record_found'), movies: movies, pages });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: res.__('server_error') });
  }
};


// Update movie
const updateMovie = async (req, res) => {
  const { movieId, title, publishingYear } = req.body;

  if (req.fileFilterError) {
    return res.status(200).json({ status: false, message: res._('errorImage') });
  }

  try {
    let movie = await movieModel.findOne({ "_id": movieId });
    if (!movie) {
      return res.status(200).json({
        status: false,
        message: res.__('movienotfound')
      });
    }

    const updatedMovie = await movieModel.findOneAndUpdate(
      { "_id": movieId },
      { $set: { title: title, publishingYear: Number(publishingYear), poster: req.file.location?req.file.location:movie.poster } },
      { new: true }
    );

    return res.status(200).json({ status: true, message: res.__('success_update'), data: updatedMovie });
  } catch (err) {
    console.log(`Error in updateCustomer API \n error: ${err}`);
    return res.status(500).json({ status: false, message: res.__('server_error'), error: err.message })
  }
};

// Delete movie by movieId
const deleteMovie = async (req, res) => {
  const { movieId } = req.body;
  let deleteMovie;

  try {
    deleteMovie = await movieModel.findByIdAndDelete(movieId);

    if (!deleteMovie) {
      return res.status(200).json({ status: false, message: res.__('record_not_found') });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: false, message: res.__('server_error'), data: err });
  }

  return res.status(200).json({ status: true, message: res.__('success_delete') });
}

// Get movie by id
const getMovieById = async (req, res) => {
  const movieId = req.query.movieId;
  try {
    const movieData = await movieModel.findOne({ "_id": movieId });
    if (!movieData) {
      return res.status(200).json({ status: false, message: res.__('movienotfound') });
    }
    return res.status(200).json({ status: true, message: res.__('record_found'), data: movieData });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ status: false, message: res.__('server_error'), error: err.message });
  }
}

export {
  addMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  getMovieById
};
