const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();

const port = 3000;
const bucketName = 'slomitas-my-video-storage';
const cloudFrontDomain = 'd1pkskx0yceldq.cloudfront.net'; // Your CloudFront domain

const s3 = new AWS.S3();

app.use(cors());

app.get('/videoList', async (req, res) => {
  try {
    const params = { Bucket: bucketName };
    const data = await s3.listObjectsV2(params).promise();
    const fileNames = data.Contents.map(item => item.Key);
    res.json(fileNames);
  } catch (error) {
    console.error('Error fetching file names from S3:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/getVideoUrl', (req, res) => {
  const fileName = req.query.fileName;
  if (!fileName) {
    return res.status(400).send('File name is required');
  }

  const cloudFrontUrl = `https://${cloudFrontDomain}/${fileName}`;
  res.json({ url: cloudFrontUrl });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
