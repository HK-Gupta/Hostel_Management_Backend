const {constants} = require("../constants")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode? res.statusCode: 500;
    var titleMessage= "";
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            titleMessage = "Validation Error";
            break;
        case constants.UNAUTHORIZED: 
            titleMessage = "Unauthorized";
            break;
        case constants.FORBIDDEN: 
            titleMessage = "Forbidden";
            break;
        case constants.NOT_FOUND: 
            titleMessage = "Not Found";
            break; 
        case constants.SERVER_ERROR: 
            titleMessage = "Server Error";
            break;
           
        default:
            break;
    }
    res.json({
        title: titleMessage,
        message: err.message,
        stackTrace: err.stack
    });

};

module.exports = errorHandler;