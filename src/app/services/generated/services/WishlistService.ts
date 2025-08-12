/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WishlistCreate } from '../models/WishlistCreate';
import type { WishlistOut } from '../models/WishlistOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WishlistService {
    /**
     * Add Wish
     * @param requestBody
     * @returns WishlistOut Successful Response
     * @throws ApiError
     */
    public static addWishProfileWishlistPost(
        requestBody: WishlistCreate,
    ): CancelablePromise<WishlistOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/profile/wishlist/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Wishlist
     * @param skip
     * @param limit
     * @returns WishlistOut Successful Response
     * @throws ApiError
     */
    public static getWishlistProfileWishlistGet(
        skip?: number,
        limit: number = 20,
    ): CancelablePromise<Array<WishlistOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profile/wishlist/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove Wish
     * @param productId
     * @returns void
     * @throws ApiError
     */
    public static removeWishProfileWishlistProductIdDelete(
        productId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/profile/wishlist/{product_id}',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
