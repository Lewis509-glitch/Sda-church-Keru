const serverless = require('serverless-http');
const app = require('../src/app');
const connectDB = require('../src/db');

const handler = serverless(app);

module.exports = async (req, res) => {
  await connectDB();
  return handler(req, res);
};
