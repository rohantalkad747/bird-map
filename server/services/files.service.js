const AWS = require("aws-sdk");
const path = require("path");

const bucket = "birdmap-files";

module.exports = {
  uploadType,
  getFiles,
};

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET,
});

/**
 * @description Uploads a file (given by the path) with the defined key.
 * @param file THe file stream.
 * @param key The key to store in the S3 databse.
 */
async function uploadFile(stream, key) {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: stream,
  };
  return await AWS.upload(params)
}
/**
 * @description Uploads a file (given by the path) for the given user.
 * In AWS S3, the key will be: {username}/{"photo", "video", or "audio"}/{filename}.
 * @param file The file path.
 * @param username The username of the user.
 * @param type The type of file. This can either be photo, video, or audio (strings).
 */
async function uploadType(file, username, type) {
  return await uploadFile(file, `${username}/${type}/${path.basename(file)}`)
}

/**
 * Returns all the files of the given file type for the given user.
 * @param {String} username
 * @param {Enumeration of ['audio', 'image']} fileType
 */
async function getFiles(username, fileType) {
  const params = {
    Bucket: bucket,
    Prefix: `${username}/${fileType}`,
  };
  const data = await AWS.listObjects(params);
  return data.Contents.slice(1)
}
