import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import { I18n } from 'i18n';
import path from "path";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

import { fileURLToPath } from 'url';

/* For Multi-language Support */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const i18n = new I18n({
  locales: ['en-US', 'es-ES'],
  directory: path.join(__dirname, 'languages'),
  defaultLocale: 'en-US'
});

app.use(i18n.init);



/* Setting Environment */
const environment = process.env.NODE_ENV || 'dev';
dotenv.config({
  path: `.env.${environment}`,
});

/* Import router */
import indexRouter from "./Routes/index.js";
app.use("/", indexRouter);

app.listen(process.env.PORT || 5858, () => {
  console.log(`Running ${environment} server on port ${process.env.PORT}`);
});

async function connectToMongoDb() {
  try {
    /* Open the MongoDB Atlas connection */
    const uri = process.env.DB_CONNECTION_URL;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error starting application:", err);
  }
}

connectToMongoDb();
