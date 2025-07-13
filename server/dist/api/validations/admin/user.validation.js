"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createUser = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().min(8),
        name: joi_1.default.string().required(),
        phone: joi_1.default.string().optional(),
        address: joi_1.default.string().optional(),
    }),
};
const getUsers = {
    query: joi_1.default.object().keys({}), // No query params for now
};
const getUser = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.string().uuid().required(),
    }),
};
const updateUser = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.string().uuid().required(),
    }),
    body: joi_1.default.object()
        .keys({
        email: joi_1.default.string().email(),
        name: joi_1.default.string(),
        phone: joi_1.default.string(),
        address: joi_1.default.string(),
    })
        .min(1), // Require at least one field to be updated
};
const deleteUser = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.string().uuid().required(),
    }),
};
exports.userValidation = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
