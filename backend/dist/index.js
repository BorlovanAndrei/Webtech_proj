"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
var corsOptions = {
    origin: 'http://localhost:3000/',
    methods: 'GET,PUT,PATCH,POST,DELETE'
};
app.use((0, cors_1.default)(corsOptions));
var port = process.env.PORT || 8001;
app.listen(port);
console.log('API is runnning at ' + port);
