/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderCreate } from '../models/OrderCreate';
import type { OrderOut } from '../models/OrderOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * Api Create Order
     * @param requestBody
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static apiCreateOrderOrdersPost(
        requestBody: OrderCreate,
    ): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Lire une commande par son ID
     * @param orderId ID de la commande
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static apiGetOrderOrdersOrderIdGet(
        orderId: string,
    ): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/{order_id}',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Mettre à jour le statut d'une commande
     * @param orderId ID de la commande
     * @param newStatus Nouveau statut
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiUpdateStatusOrdersOrderIdStatusPatch(
        orderId: string,
        newStatus: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/orders/{order_id}/status',
            path: {
                'order_id': orderId,
            },
            query: {
                'new_status': newStatus,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Marquer la commande comme payée (COD) ou remboursée
     * @param orderId ID de la commande
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiMarkPaidOrdersOrderIdPayPatch(
        orderId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/orders/{order_id}/pay',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Permet au client d'annuler sa commande si elle est encore en pending
     * @param orderId ID de la commande à annuler
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static apiCancelOrderOrdersOrderIdCancelPatch(
        orderId: string,
    ): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/orders/{order_id}/cancel',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
