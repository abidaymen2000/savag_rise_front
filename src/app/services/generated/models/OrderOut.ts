/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
import type { ShippingInfo } from './ShippingInfo';
export type OrderOut = {
    user_id?: (string | null);
    items: Array<OrderItem>;
    shipping: ShippingInfo;
    payment_method?: OrderOut.payment_method;
    id: string;
    total_amount: number;
    status: OrderOut.status;
    payment_status: OrderOut.payment_status;
    created_at: string;
    updated_at: string;
};
export namespace OrderOut {
    export enum payment_method {
        COD = 'cod',
        STRIPE = 'stripe',
        PAYPAL = 'paypal',
    }
    export enum status {
        PENDING = 'pending',
        CONFIRMED = 'confirmed',
        SHIPPED = 'shipped',
        DELIVERED = 'delivered',
        CANCELLED = 'cancelled',
    }
    export enum payment_status {
        UNPAID = 'unpaid',
        PAID = 'paid',
        REFUNDED = 'refunded',
    }
}

