export default class s extends Error {
  constructor(status,message) {
    super(message);
    this.status = status;
  }
  static BadRequestError() {
    return new AuthError(400, 'Пользователь с таким email уже зарегистрирован')
  }
}


