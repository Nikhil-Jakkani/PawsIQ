"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_js_1 = require("../../controllers/admin/auth.controller.js");
const validate_js_1 = require("../../middlewares/validate.js");
const auth_validation_js_1 = require("../../validations/admin/auth.validation.js");
const router = (0, express_1.Router)();
router.post('/login', (0, validate_js_1.validate)(auth_validation_js_1.loginSchema), auth_controller_js_1.authController.login);
exports.default = router;
