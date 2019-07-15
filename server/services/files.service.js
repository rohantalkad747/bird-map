const AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv")();

/* AWS S3 bucket name */
const BUCKET_NAME = "birdmap-files";

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET
});

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
    Key: `${userId}/${fileType}/${file.nam}`,
    Body: file.file
  };
  await AWS.upload(params).promise();
  fs.unlinkSync(file.path);
}

/**
 * Returns all the files of the given file type for the given user.
 * @param req The request object.
 * @param userId The user's id.
 * @param fileType Enumeration of ['audio', 'image']
 */
async function getFilesFromUser(req, userId, fileType) {
  const params = {
    Bucket: BUCKET_NAME,
    Prefix: `${userId}/${fileType}`
  };
  const data = await AWS.listObjects(params).promise();
  return data.Contents.slice(1);
}

/**
 * Returns all the files of the given file type for the given user.
 * @param req The request object.
 * @param userId The user's id.
 * @param fileType Enumeration of ['audio', 'image']
 */
async function getAllAudioClips(req, userId, fileType) {
  const params = {
    Bucket: BUCKET_NAME,
    Prefix: `${userId}/${fileType}`
  };
  const data = await AWS.listObjects(params).promise();
  return data.Contents.slice(1);
}

module.exports = {
  uploadType,
  getFilesFromUser,
  getAllAudioClips,
  getAllImages
};
