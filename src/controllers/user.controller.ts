import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { createuserTypes } from '../validations/interface/userTypes';
import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import customerModel, { UserProps } from "../model/users.model";
import { v4 as uuidv4 } from 'uuid';

// const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxzy')
export const createUser = AsyncHandler(async (req: Request<{}, {}, createuserTypes>, res: Response) => {
    const { customer_name, pickoff_location, pickup_location } = req.body
    try {
        const data: HydratedDocument<UserProps> = await new customerModel({
            customer_id: `CustomerID_${uuidv4().substring(0, 20)}`, customer_name, pickup_location, pickoff_location
        }).save()
        if (data) {
            res.send({
                res: "ok",
                status: "success",
                msg: "customer created successully",
                customer: data
            })
        }
    } catch (error: any) {
        res.status(404).json({
            res: "fail",
            msg: error.message
        })
    }

})

// @desc:get all customers queue
export const listCustomers = AsyncHandler(async (req: Request, res: Response) => {
    try {
        const allcustomers = await customerModel.find().select("-__v")
        if (allcustomers.length > 0) {
            res.send({
                res: "ok",
                status: "success",
                total: allcustomers.length,
                customers: allcustomers
            })
        } else {
            res.send({
                res: "ok",
                status: "no customer found",
                customers: allcustomers
            })
        }
    } catch (error: any) {
        res.status(404).json({
            res: "fail",
            msg: error.message
        })
    }
})

export const listSingleCustomer = AsyncHandler(async (req: Request, res: Response) => {
    let id = req.params.customer_id
    if (!id) return
    try {
        const singleCustomer = await customerModel.findOne({ customer_id: id })
        if (!singleCustomer) {
            res.send({
                res: "fail",
                status: "no customer found",
            })
        } else {
            res.send({
                res: "ok",
                status: "success",
                customer: singleCustomer
            })
        }

    } catch (error: any) {
        res.status(404).json({
            res: "fail",
            msg: error.message

        })
    }
})

export const deleteCustomer = AsyncHandler(async (req: Request, res: Response) => {
    let id = req.params.customer_id
    if (!id) return
    try {
        const singleCustomer = await customerModel.findOneAndDelete({ customer_id: id })
        if (!singleCustomer) {
            res.send({
                res: "fail",
                status: "no customer found",
            })
        } else {
            res.send({
                res: "ok",
                status: "customer deleted successfully",
                customer: singleCustomer
            })
        }

    } catch (error: any) {
        res.status(404).json({
            res: "fail",
            msg: error.message

        })
    }
})

export const updateCustomer = AsyncHandler(async (req: Request, res: Response) => {
    let id = req.params.customer_id
    const { customer_name, pickoff_location, pickup_location } = req.body as createuserTypes

    if (!id) return
    try {
        const singleCustomer = await customerModel.findOne<HydratedDocument<UserProps>>({ customer_id: id })
        if (!singleCustomer) {

            res.send({
                res: "fail",
                status: "no customer found",
            })
        } else {
            const updateCustomer = await customerModel.findOneAndUpdate({ customer_id: id }, {
                $set: {
                    customer_name: customer_name || singleCustomer.customer_name,
                    pickoff_location: pickoff_location || singleCustomer.pickoff_location,
                    pickup_location: pickup_location || singleCustomer.pickup_location
                }
            }, { new: true })

            if (updateCustomer) {
                res.send({
                    res: "ok",
                    status: "customer updated successfully",
                    customer: updateCustomer
                })
            } else {
                res.send({
                    res: "fail",
                    msg: "unable to update customer",
                })
            }
        }

    } catch (error: any) {
        res.status(404).json({
            res: "fail",
            msg: error.message

        })
    }
})
