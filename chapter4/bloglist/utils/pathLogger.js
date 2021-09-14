const logger = require("./logger")

// extracts resource request URL and logs it into console
module.exports = (req, res, next) => {
  if(req.get("host") && req.originalUrl)
    logger.info(req.get("host") + req.originalUrl) 
  next()
}