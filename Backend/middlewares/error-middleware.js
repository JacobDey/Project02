import { APP_ERROR_MESSAGE } from "../constants/constant.js";

export default function errorMiddleware(error, req, res) {
  const status = error.status ? error.status : 500;
  const message =
    status === 500 ? APP_ERROR_MESSAGE.serverError : error.message;
  const errors = error.error;
  res.status(status).send({ status, message, error: errors });
}
