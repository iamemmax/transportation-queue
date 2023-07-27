"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const users_joi_1 = require("../validations/schema/users.joi");
const validate_1 = require("../validations/validate");
const router = express_1.default.Router();
router.get("/", user_controller_1.listCustomers);
router.get("/:customer_id", user_controller_1.listSingleCustomer);
router.delete("/:customer_id", user_controller_1.deleteCustomer);
router.put("/:customer_id", user_controller_1.updateCustomer);
router.post("/create", (0, validate_1.validateSchema)(users_joi_1.createUserValidation), user_controller_1.createUser);
// router.post("/authenticate", validateSchema(validateLoginSchema), loginUser)
exports.default = router;
