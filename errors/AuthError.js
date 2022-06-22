export default class AuthError extends Error {

  constructor(status,message) {
    super(message);
    this.status = status;
  }
  static UnauthorizedError(){
    return new AuthError(401,'Пользователь не авторизован')
  }
  static BadRequestError(){
    return new AuthError(400, 'Пользователь с таким email уже зарегистрирован')
  }
}


