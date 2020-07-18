const AWS = require('aws-sdk');
const ServerError = require('../errors/ServerError');
const keys = require('config').AWS;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME || keys.BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION || keys.REGION;
const AWS_KEY_ID = process.env.AWS_KEY_ID || keys.accessKeyId;
const AWS_SECRET_KEY_ID = process.env.AWS_SECRET_KEY_ID || keys.secretAccessKey;

class Storage {
  constructor() {
    this.S3 = new AWS.S3({
      accessKeyId: AWS_KEY_ID,
      secretAccessKey: AWS_SECRET_KEY_ID,
      region: AWS_REGION,
    });
  }

  async upload(file, user) {
    const key = `${user}/avatar/${user}.jpg`;
    console.log(file);
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.buffer,
    };

    try {
      return await this.S3.upload(params).promise();
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new Storage();
