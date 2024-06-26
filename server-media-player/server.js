const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;
const bucketName = 'slomitas-my-video-storage'

AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3();

app.get('/videoList', async (req, res) => {
    try {
        const S3Objects = await s3.listObjectsV2({ Bucket: bucketName }).promise();
        const result = S3Objects.Contents.map((s3Object) => s3Object.Key.replace('.mp4', ''));
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching video files' });
        console.error('Error fetching video files', err);
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
