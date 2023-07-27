import Joi from 'joi';
import { authenticateUserTypes, createuserTypes } from '../interface/userTypes';

export const createUserValidation = Joi.object<createuserTypes>({
    customer_name: Joi.string().required(),
    pickup_location: Joi.string().required(),
    pickoff_location: Joi.string().required(),

})
export const validateLoginSchema = Joi.object<authenticateUserTypes>({
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})