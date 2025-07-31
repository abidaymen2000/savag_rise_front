/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
import type { ShippingInfo } from './ShippingInfo';
export type OrderCreate = {
    user_id?: (string | null);
    items: Array<OrderItem>;
    shipping: ShippingInfo;
    payment_method?: OrderCreate.payment_method;
};
export namespace OrderCreate {
    export enum payment_method {
        COD = 'cod',
        STRIPE = 'stripe',
        PAYPAL = 'paypal',
    }
}

