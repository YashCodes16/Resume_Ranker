import { logger } from "./logger.middleware.js";

export class customError extends Error {
  constructor(message, _statusCode) {
    super(message);
    this.statusCode = _statusCode;
  }
}

export let errorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    logger.error(err.message, { url: req.url });
    return res
      .status(err.statusCode)
      .send({ success: false, message: err.message });
  }
  logger.error("Oops! Something went wrong... Please try again later!", {
    url: req.url,
  });
  console.log(err);
  return res.status(500).send({
    success: false,
    message: "Oops, Something went wrong!! Please try again later.",
  });
};
