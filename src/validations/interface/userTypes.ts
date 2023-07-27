export interface createuserTypes {
    customer_id?: string;
    customer_name: string;
    pickup_location: string;
    pickoff_location: string;

}
export interface authenticateUserTypes {
    email: string;
    password: string;
}