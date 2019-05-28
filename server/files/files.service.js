const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');

const bucket = "birdmap-files";

module.exports = {
    uploadType,
    getFiles
};

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET
});

const s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});


/**
 * @description Uploads a file (given by the path) with the defined key.
 * @param file THe file path.
 * @param key The key to store in the S3 databse.
 */
async function uploadFile(file, key) {
    let fileStream = fs.createReadStream(file);
    fileStream.on('error', (err) => {
        console.log('File Error', err);
    });
    const params = {
        Bucket: bucket,
        Key: key,
        Body: fileStream
    };
    s3.upload(params, (s3err, data) => {
        if (s3err) throw s3err;
        console.log(`${data} uploaded`);
    });
}
/**
 * @description Uploads a file (given by the path) for the given user.
 * In AWS S3, the key will be: {username}/{"photo", "video", or "audio"}/{filename}.
 * @param file The file path.
 * @param username The username of the user.
 * @param type The type of file. This can either be photo, video, or audio (strings).
 */
async function uploadType(file, username, type) {
    return await uploadFile(file, `${username}/${type}/${path.basename(file)}`);
}

async function getFiles(username, fileType) {
    const params = {
        Bucket: bucket,
        Prefix: `${username}/${fileType}`
    };
    s3.listObjects(params, (err, data) => {
        if (err) throw err;
        if (data.Contents.length == 1) {
            return Error("No files!");
        }
        return data.Contents.slice(1);
        }
    );
}
