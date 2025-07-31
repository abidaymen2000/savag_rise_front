/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VariantCreate } from '../models/VariantCreate';
import type { VariantOut } from '../models/VariantOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VariantsService {
    /**
     * List Variants
     * @param productId
     * @returns VariantOut Successful Response
     * @throws ApiError
     */
    public static listVariantsProductsProductIdVariantsGet(
        productId: string,
    ): CancelablePromise<Array<VariantOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{product_id}/variants/',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Variant
     * @param productId
     * @param requestBody
     * @returns VariantOut Successful Response
     * @throws ApiError
     */
    public static createVariantProductsProductIdVariantsPost(
        productId: string,
        requestBody: VariantCreate,
    ): CancelablePromise<VariantOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products/{product_id}/variants/',
            path: {
                'product_id': productId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Change Stock
     * @param productId
     * @param color
     * @param size
     * @param newStock
     * @returns void
     * @throws ApiError
     */
    public static changeStockProductsProductIdVariantsColorSizeStockPatch(
        productId: string,
        color: string,
        size: string,
        newStock: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/products/{product_id}/variants/{color}/{size}/stock',
            path: {
                'product_id': productId,
                'color': color,
                'size': size,
            },
            query: {
                'new_stock': newStock,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
