const AWS = require('aws-sdk');
const ServerError = require('../errors/ServerError');
const keys = require('config').AWS;
const BUCKET_NAME = keys.BUCKET_NAME;
const AWS_REGION = keys.REGION;

class Storage {
  constructor() {
    this.S3 = new AWS.S3({
      accessKeyId: keys.accessKeyId,
      secretAccessKey: keys.secretAccessKey,
      region: AWS_REGION,
    });
  }

  async upload(file, user) {
    const key = `${user}/avatar/${user}.jpg`;
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.buffer,
    };

    try {
      const data = await this.S3.upload(params).promise();
      return data;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new Storage();
