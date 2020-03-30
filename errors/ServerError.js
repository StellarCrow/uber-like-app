
class ServerError extends Error {
  constructor(args) {
    super(args);
    this.name = 'ServerError';
  }
}

module.exports = ServerError;
