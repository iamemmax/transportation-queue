import express from "express"
import { createUser, deleteCustomer, listCustomers, listSingleCustomer, updateCustomer } from "../controllers/user.controller"
import { createUserValidation, validateLoginSchema } from "../validations/schema/users.joi";
import { validateSchema } from '../validations/validate';
const router = express.Router()

router.get("/", listCustomers)
router.get("/:customer_id", listSingleCustomer)
router.delete("/:customer_id", deleteCustomer)
router.put("/:customer_id", updateCustomer)
router.post("/create", validateSchema(createUserValidation), createUser)
// router.post("/authenticate", validateSchema(validateLoginSchema), loginUser)

export default router