
export default function errorsLogger(err, req, res, next) {
  console.log(err);
  if (err) {
    return res.status(err.status).json({message: err.message});
  }
  return res.status(500).json({message: 'Ошибка на сервере'})
}

