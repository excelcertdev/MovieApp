import express from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const environment = process.env.NODE_ENV || 'dev';
dotenv.config({
  path: `.env.${environment}`,
});

const app = express();
app.use(bodyParser.json());

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: { 
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

const uploadS3MovieImages = multer({
  storage: multerS3({
    s3: s3Client,
    acl: 'public-read',
    bucket: 'movies-webapp',
    key: (req, file, cb) => {
      console.log(file);
      cb(null, `images/${file.originalname}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

export { uploadS3MovieImages };
