import mongoose from "mongoose";

export interface UserProps {
    customer_id: string;
    customer_name: string;
    pickup_location: string;
    pickoff_location?: string;
    updatedAt?: Date;
    createdAt?: Date;
}
const customerSchema = new mongoose.Schema<UserProps>({

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
})
const customerModel = mongoose.model<UserProps>("users", customerSchema)
export default customerModel