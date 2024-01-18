const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { I18n } = require('i18n');
const path = require('path');

dotenv.config();

const app = express();

// Body parser middleware to handle JSON and URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// I18n setup for internationalization
const i18n = new I18n({
  locales: ['en-US', 'es-ES'],
  directory: path.join(__dirname, 'languages'),
  defaultLocale: 'en-US',
});

app.use(i18n.init);

/* Setting Environment */
const environment = process.env.NODE_ENV || 'dev';

// Load environment variables based on the environment
dotenv.config({
  path: `.env.${environment}`,
});

/* Import routers */
const userRouter = require('./Routes/userRoute.js');
const movieRoute = require('./Routes/movieRoute.js');

// Use the defined routers for specific routes
app.use('/api/user', userRouter);
app.use('/api/movie', movieRoute);

// Start the server and listen on the specified port
app.listen(process.env.PORT || 5858, () => {
  console.log(`Running ${environment} server on port ${process.env.PORT}`);
});

// Function to connect to MongoDB Atlas
async function connectToMongoDb() {
  try {
    /* Open the MongoDB Atlas connection */
    const uri = process.env.DB_CONNECTION_URL;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error starting application:', err);
  }
}

// Call the function to connect to MongoDB
connectToMongoDb();
