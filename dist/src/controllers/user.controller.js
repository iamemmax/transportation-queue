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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomer = exports.deleteCustomer = exports.listSingleCustomer = exports.listCustomers = exports.createUser = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var users_model_1 = __importDefault(require("../model/users.model"));
var uuid_1 = require("uuid");
// const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxzy')
exports.createUser = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, customer_name, pickoff_location, pickup_location, data, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, customer_name = _a.customer_name, pickoff_location = _a.pickoff_location, pickup_location = _a.pickup_location;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, new users_model_1.default({
                        customer_id: "CustomerID_".concat((0, uuid_1.v4)().substring(0, 20)),
                        customer_name: customer_name,
                        pickup_location: pickup_location,
                        pickoff_location: pickoff_location
                    }).save()];
            case 2:
                data = _b.sent();
                if (data) {
                    res.send({
                        res: "ok",
                        status: "success",
                        msg: "customer created successully",
                        customer: data
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(404).json({
                    res: "fail",
                    msg: error_1.message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @desc:get all customers queue
exports.listCustomers = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allcustomers, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users_model_1.default.find().select("-__v")];
            case 1:
                allcustomers = _a.sent();
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
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(404).json({
                    res: "fail",
                    msg: error_2.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.listSingleCustomer = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, singleCustomer, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.customer_id;
                if (!id)
                    return [2 /*return*/];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, users_model_1.default.findOne({ customer_id: id })];
            case 2:
                singleCustomer = _a.sent();
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
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(404).json({
                    res: "fail",
                    msg: error_3.message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.deleteCustomer = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, singleCustomer, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.customer_id;
                if (!id)
                    return [2 /*return*/];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, users_model_1.default.findOneAndDelete({ customer_id: id })];
            case 2:
                singleCustomer = _a.sent();
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
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(404).json({
                    res: "fail",
                    msg: error_4.message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.updateCustomer = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, customer_name, pickoff_location, pickup_location, singleCustomer, updateCustomer_1, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.customer_id;
                _a = req.body, customer_name = _a.customer_name, pickoff_location = _a.pickoff_location, pickup_location = _a.pickup_location;
                if (!id)
                    return [2 /*return*/];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, users_model_1.default.findOne({ customer_id: id })];
            case 2:
                singleCustomer = _b.sent();
                if (!!singleCustomer) return [3 /*break*/, 3];
                res.send({
                    res: "fail",
                    status: "no customer found",
                });
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, users_model_1.default.findOneAndUpdate({ customer_id: id }, {
                    $set: {
                        customer_name: customer_name || singleCustomer.customer_name,
                        pickoff_location: pickoff_location || singleCustomer.pickoff_location,
                        pickup_location: pickup_location || singleCustomer.pickup_location
                    }
                }, { new: true })];
            case 4:
                updateCustomer_1 = _b.sent();
                if (updateCustomer_1) {
                    res.send({
                        res: "ok",
                        status: "customer updated successfully",
                        customer: updateCustomer_1
                    });
                }
                else {
                    res.send({
                        res: "fail",
                        msg: "unable to update customer",
                    });
                }
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_5 = _b.sent();
                res.status(404).json({
                    res: "fail",
                    msg: error_5.message
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
