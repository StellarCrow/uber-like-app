/** Class for custom server errors */
class ServerError extends Error {
  constructor(args) {
    super(args);
    this.name = 'ServerError';
  }
}

module.exports = ServerError;
