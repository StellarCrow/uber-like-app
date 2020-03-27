/** Class for custom errors */
class ServerError extends Error {
  /**
   * Constructor.
   * @param {object} args - args.
   */
  constructor(args) {
    super(args);
    this.name = 'ServerError';
  }
}

module.exports = ServerError;
