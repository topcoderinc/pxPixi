const express = require('express');
const path = require('path');
const logger = require('winston');
const config = require('./config');

const app = express();

// view engine setup
app.use(express.static(path.join(__dirname, 'dist')));

module.exports = app;

// start the server if the current module is main
if (!module.parent) {
  const server = app.listen(config.PORT);
  server.on('error', error => logger.error(error));
  server.on('listening', () => logger.info('Container server started on port', config.PORT));
}
