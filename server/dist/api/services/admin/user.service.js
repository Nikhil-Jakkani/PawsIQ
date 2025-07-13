"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const supabase_js_1 = require("../../../config/supabase.js");
const ApiError_js_1 = require("../../utils/ApiError.js");
const http_status_1 = __importDefault(require("http-status"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (userData) => {
    const { email, password, name, phone, address } = userData;
    const { data: existingUser, error: selectError } = await supabase_js_1.supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();
    if (existingUser) {
        throw new ApiError_js_1.ApiError(http_status_1.default.BAD_REQUEST, 'Email already taken');
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const { data, error } = await supabase_js_1.supabase
        .from('users')
        .insert([{ email, password: hashedPassword, name, phone, address }])
        .select();
    if (error) {
        throw new ApiError_js_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Could not create user');
    }
    return data[0];
};
const getUsers = async () => {
    const { data, error } = await supabase_js_1.supabase.from('users').select('*');
    if (error) {
        throw new ApiError_js_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Could not fetch users');
    }
    return data;
};
const getUserById = async (id) => {
    const { data, error } = await supabase_js_1.supabase.from('users').select('*').eq('id', id).single();
    if (error || !data) {
        throw new ApiError_js_1.ApiError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return data;
};
const updateUserById = async (id, updateBody) => {
    const user = await getUserById(id);
    const { data, error } = await supabase_js_1.supabase
        .from('users')
        .update(updateBody)
        .eq('id', id)
        .select();
    if (error) {
        throw new ApiError_js_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Could not update user');
    }
    return data[0];
};
const deleteUserById = async (id) => {
    await getUserById(id);
    const { error } = await supabase_js_1.supabase.from('users').delete().eq('id', id);
    if (error) {
        throw new ApiError_js_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Could not delete user');
    }
    return { message: 'User deleted successfully' };
};
exports.userService = {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
