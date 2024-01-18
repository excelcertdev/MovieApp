const express = require('express');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

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
      cb(null, `images/${file.originalname}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

module.exports = { uploadS3MovieImages };
