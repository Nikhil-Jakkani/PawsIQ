"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5173;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const index_js_1 = __importDefault(require("./api/routes/index.js"));
app.get('/', (req, res) => {
    res.send('PawsIQ Backend Server is running!');
});
app.use('/api/v1', index_js_1.default);
// Error handling
const error_js_1 = require("./api/middlewares/error.js");
app.use(error_js_1.errorConverter);
app.use(error_js_1.errorHandler);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
