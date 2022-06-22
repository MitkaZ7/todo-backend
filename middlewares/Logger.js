import winston from 'winston';
import expressWinston from 'express-winston';

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json()
})

export { requestLogger, errorLogger }





export default function Logger(err, req, res, next) {
  console.log(err);
  if (err) {
    return res.status(err.status).json({message: err.message});
  }
  return res.status(500).json({message: 'Ошибка на сервере'})
}

