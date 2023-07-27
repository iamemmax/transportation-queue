"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginSchema = exports.createUserValidation = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createUserValidation = joi_1.default.object({
    customer_name: joi_1.default.string().required(),
    pickup_location: joi_1.default.string().required(),
    pickoff_location: joi_1.default.string().required(),
});
exports.validateLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
