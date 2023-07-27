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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { value, error } = yield schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(404).json({
                res: "fail",
                msg: (_a = error.details) === null || _a === void 0 ? void 0 : _a.map((x) => x.message).join(","),
            });
        }
        if (value) {
            return next();
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.validateSchema = validateSchema;
