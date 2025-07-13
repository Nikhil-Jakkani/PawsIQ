"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_service_js_1 = require("../../services/admin/user.service.js");
const catchAsync_js_1 = require("../../utils/catchAsync.js");
const createUser = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const user = await user_service_js_1.userService.createUser(req.body);
    res.status(http_status_1.default.CREATED).send(user);
});
const getUsers = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const users = await user_service_js_1.userService.getUsers();
    res.send(users);
});
const getUser = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const user = await user_service_js_1.userService.getUserById(req.params.userId);
    res.send(user);
});
const updateUser = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    const user = await user_service_js_1.userService.updateUserById(req.params.userId, req.body);
    res.send(user);
});
const deleteUser = (0, catchAsync_js_1.catchAsync)(async (req, res) => {
    await user_service_js_1.userService.deleteUserById(req.params.userId);
    res.status(http_status_1.default.NO_CONTENT).send();
});
exports.userController = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
