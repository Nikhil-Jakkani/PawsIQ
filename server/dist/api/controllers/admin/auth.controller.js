"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const auth_service_js_1 = require("../../services/admin/auth.service.js");
const catchAsync_js_1 = require("../../utils/catchAsync.js");
const login = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const { email, password } = req.body;
    const response = await auth_service_js_1.authService.login(email, password);
    res.status(http_status_1.default.OK).send(response);
});
exports.authController = {
    login,
};
