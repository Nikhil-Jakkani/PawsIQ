"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const supabase_js_1 = require("../../../config/supabase.js");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_js_1 = require("../../utils/ApiError.js");
const http_status_1 = __importDefault(require("http-status"));
const login = async (email, password) => {
    const { data, error: supabaseError } = await supabase_js_1.supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .single(); // Use .single() to get one record or null
    if (supabaseError || !data) {
        throw new ApiError_js_1.ApiError(http_status_1.default.UNAUTHORIZED, 'Incorrect email or password');
    }
    const admin = data;
    const isPasswordMatch = await bcryptjs_1.default.compare(password, admin.password);
    if (!isPasswordMatch) {
        throw new ApiError_js_1.ApiError(http_status_1.default.UNAUTHORIZED, 'Incorrect email or password');
    }
    const token = jsonwebtoken_1.default.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    // Return user and token, as expected by the frontend
    const { password: _, ...userWithoutPassword } = admin;
    return { user: userWithoutPassword, token };
};
exports.authService = {
    login,
};
