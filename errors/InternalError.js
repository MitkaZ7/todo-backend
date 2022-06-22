export default class InternalError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

