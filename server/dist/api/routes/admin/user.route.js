"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../../middlewares/auth.js");
const validate_js_1 = require("../../middlewares/validate.js");
const user_controller_js_1 = require("../../controllers/admin/user.controller.js");
const user_validation_js_1 = require("../../validations/admin/user.validation.js");
const router = (0, express_1.Router)();
router
    .route('/')
    .post(auth_js_1.auth, (0, validate_js_1.validate)(user_validation_js_1.userValidation.createUser), user_controller_js_1.userController.createUser)
    .get(auth_js_1.auth, (0, validate_js_1.validate)(user_validation_js_1.userValidation.getUsers), user_controller_js_1.userController.getUsers);
router
    .route('/:userId')
    .get(auth_js_1.auth, (0, validate_js_1.validate)(user_validation_js_1.userValidation.getUser), user_controller_js_1.userController.getUser)
    .patch(auth_js_1.auth, (0, validate_js_1.validate)(user_validation_js_1.userValidation.updateUser), user_controller_js_1.userController.updateUser)
    .delete(auth_js_1.auth, (0, validate_js_1.validate)(user_validation_js_1.userValidation.deleteUser), user_controller_js_1.userController.deleteUser);
exports.default = router;
