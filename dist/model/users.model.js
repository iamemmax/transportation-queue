"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    customer_name: {
        type: String,
        required: true,
    },
    customer_id: {
        type: String,
        required: true,
    },
    pickoff_location: {
        type: String,
        required: true,
    },
    pickup_location: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});
const customerModel = mongoose_1.default.model("users", customerSchema);
exports.default = customerModel;
