const fs = require('fs');
const AWS = require('aws-sdk');

// TODO
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
// Schema for keys is as such: {username}/[music, video, photo]/{filename}

async function uploadFile(file, key) {
    fs.open(file, (err, data) => {
        if (err) throw err;
        const params = {
                Bucket: 'Birdmap',
                Key: key,
                Body: data
        };
    });
}

async function uploadMusic(file, filename, username, type) {
    uploadFile(file, `${username}/${type}/${filename}`);
}
