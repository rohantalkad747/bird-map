/** =========================================================
 * Service functions for uploading and download files from S3.
 * @author Rohan
 * ==========================================================
 */

require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");

/* AWS S3 bucket name */
const BUCKET_NAME = "birdmap-files";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET
});

const S3_CONTROL = AWS.S3;

/* Keyword for file types when receiving files from the front-end */
const IMAGE_TYPE = "image";
const AUDIO_TYPE = "audio";

/**
 * Uploads a file to the S3 bucket with a unique key based on the user id.
 * @param userId The user's id.
 * @param file The file object.
 * @param fileType Enumeration of [IMAGE_TYPE, AUDIO_TYPE]
 */
async function uploadToBucket(userId, file, fileType) {
  if (fileType !== AUDIO_TYPE || fileType !== IMAGE_TYPE) {
    throw Error("File type is invalid!");
  }
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${fileType}/${userId}/${file.filename}`,
    Body: fs.createReadStream(file.file)
  };
  await S3_CONTROL.upload(params).promise();
  fs.unlinkSync(file.path);
}

/**
 * Returns all the files of the given file type.
 * @param res The response object.
 * @param fileType Enumeration of ['audio', 'image']
 *  @param key Optional: The user's id.
 */
async function getBucketFiles(res, fileType, key) {
  const params = {
    Bucket: BUCKET_NAME,
    Prefix: fileType + key ? `/${key}` : ""
  };
  const data = await S3_CONTROL.listObjects(params).promise();
  res.pipe(data.createReadStream());
}

async function deleteBucketFile(fileType, userId, fileName) {
  const params = {
    Bucket: BUCKET_NAME,
    key: `${fileType}/${userId}/${fileName}`
  };
  await S3_CONTROL.deleteObject(params);
}

module.exports = {
  uploadToBucket,
  getBucketFiles,
  deleteBucketFile
};
