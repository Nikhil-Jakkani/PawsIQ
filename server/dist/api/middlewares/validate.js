"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const ApiError_js_1 = require("../utils/ApiError.js");
const http_status_1 = __importDefault(require("http-status"));
const validate = (schema) => (req, res, next) => {
    const validSchema = joi_1.default.object(Object.keys(schema).reduce((acc, key) => {
        acc[key] = schema[key];
        return acc;
    }, {}));
    const objectToValidate = Object.keys(schema).reduce((acc, key) => {
        acc[key] = req[key];
        return acc;
    }, {});
    const { value, error } = validSchema.validate(objectToValidate, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError_js_1.ApiError(http_status_1.default.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.validate = validate;
