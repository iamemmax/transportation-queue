"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomer = exports.deleteCustomer = exports.listSingleCustomer = exports.listCustomers = exports.createUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const users_model_1 = __importDefault(require("../model/users.model"));
const uuid_1 = require("uuid");
// const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxzy')
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_name, pickoff_location, pickup_location } = req.body;
    try {
        const data = yield new users_model_1.default({
            customer_id: `CustomerID_${(0, uuid_1.v4)().substring(0, 20)}`, customer_name, pickup_location, pickoff_location
        }).save();
        if (data) {
            res.send({
                res: "ok",
                status: "success",
                msg: "customer created successully",
                customer: data
            });
        }
    }
    catch (error) {
        res.status(404).json({
            res: "fail",
            msg: error.message
        });
    }
}));
// @desc:get all customers queue
exports.listCustomers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allcustomers = yield users_model_1.default.find().select("-__v");
        if (allcustomers.length > 0) {
            res.send({
                res: "ok",
                status: "success",
                total: allcustomers.length,
                customers: allcustomers
            });
        }
        else {
            res.send({
                res: "ok",
                status: "no customer found",
                customers: allcustomers
            });
        }
    }
    catch (error) {
        res.status(404).json({
            res: "fail",
            msg: error.message
        });
    }
}));
exports.listSingleCustomer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.customer_id;
    if (!id)
        return;
    try {
        const singleCustomer = yield users_model_1.default.findOne({ customer_id: id });
        if (!singleCustomer) {
            res.send({
                res: "fail",
                status: "no customer found",
            });
        }
        else {
            res.send({
                res: "ok",
                status: "success",
                customer: singleCustomer
            });
        }
    }
    catch (error) {
        res.status(404).json({
            res: "fail",
            msg: error.message
        });
    }
}));
exports.deleteCustomer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.customer_id;
    if (!id)
        return;
    try {
        const singleCustomer = yield users_model_1.default.findOneAndDelete({ customer_id: id });
        if (!singleCustomer) {
            res.send({
                res: "fail",
                status: "no customer found",
            });
        }
        else {
            res.send({
                res: "ok",
                status: "customer deleted successfully",
                customer: singleCustomer
            });
        }
    }
    catch (error) {
        res.status(404).json({
            res: "fail",
            msg: error.message
        });
    }
}));
exports.updateCustomer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.customer_id;
    const { customer_name, pickoff_location, pickup_location } = req.body;
    if (!id)
        return;
    try {
        const singleCustomer = yield users_model_1.default.findOne({ customer_id: id });
        if (!singleCustomer) {
            res.send({
                res: "fail",
                status: "no customer found",
            });
        }
        else {
            const updateCustomer = yield users_model_1.default.findOneAndUpdate({ customer_id: id }, {
                $set: {
                    customer_name: customer_name || singleCustomer.customer_name,
                    pickoff_location: pickoff_location || singleCustomer.pickoff_location,
                    pickup_location: pickup_location || singleCustomer.pickup_location
                }
            }, { new: true });
            if (updateCustomer) {
                res.send({
                    res: "ok",
                    status: "customer updated successfully",
                    customer: updateCustomer
                });
            }
            else {
                res.send({
                    res: "fail",
                    msg: "unable to update customer",
                });
            }
        }
    }
    catch (error) {
        res.status(404).json({
            res: "fail",
            msg: error.message
        });
    }
}));
