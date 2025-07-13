"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_js_1 = require("../utils/ApiError.js");
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError_js_1.ApiError)) {
        const statusCode = error.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
        const message = error.message || http_status_1.default[statusCode] || 'Internal Server Error';
        error = new ApiError_js_1.ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR];
    }
    res.locals.errorMessage = err.message;
    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };
    if (process.env.NODE_ENV === 'development') {
        console.error(err);
    }
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
