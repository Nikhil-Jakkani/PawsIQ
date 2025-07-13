"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_js_1 = require("../utils/ApiError.js");
const supabase_js_1 = require("../../config/supabase.js");
const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(new ApiError_js_1.ApiError(http_status_1.default.UNAUTHORIZED, 'Please authenticate'));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { data: admin, error } = await supabase_js_1.supabase
            .from('admins')
            .select('*')
            .eq('id', decoded.id)
            .single();
        if (error || !admin) {
            return next(new ApiError_js_1.ApiError(http_status_1.default.UNAUTHORIZED, 'Please authenticate'));
        }
        // You can attach the admin to the request object if needed
        // (req as any).admin = admin;
        next();
    }
    catch (error) {
        return next(new ApiError_js_1.ApiError(http_status_1.default.UNAUTHORIZED, 'Please authenticate'));
    }
};
exports.auth = auth;
