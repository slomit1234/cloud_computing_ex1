const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();

const port = 3000;
const bucketName = 'slomitas-my-video-storage';

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

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 3600 // URL expiry time in seconds
  };

  s3.getSignedUrl('getObject', params, (err, url) => {
    if (err) {
      console.error('Error generating presigned URL:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.json({ url });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
