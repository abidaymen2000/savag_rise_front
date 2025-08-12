/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewCreate } from '../models/ReviewCreate';
import type { ReviewOut } from '../models/ReviewOut';
import type { ReviewStats } from '../models/ReviewStats';
import type { ReviewUpdate } from '../models/ReviewUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReviewsService {
    /**
     * Add Review
     * @param productId
     * @param requestBody
     * @returns ReviewOut Successful Response
     * @throws ApiError
     */
    public static addReviewProductsProductIdReviewsPost(
        productId: string,
        requestBody: ReviewCreate,
    ): CancelablePromise<ReviewOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products/{product_id}/reviews/',
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
     * Get Reviews
     * @param productId
     * @param rating
     * @param sortBest true pour tri par note desc
     * @param skip
     * @param limit
     * @returns ReviewOut Successful Response
     * @throws ApiError
     */
    public static getReviewsProductsProductIdReviewsGet(
        productId: string,
        rating?: (number | null),
        sortBest: boolean = false,
        skip?: number,
        limit: number = 10,
    ): CancelablePromise<Array<ReviewOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{product_id}/reviews/',
            path: {
                'product_id': productId,
            },
            query: {
                'rating': rating,
                'sort_best': sortBest,
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Review Stats
     * @param productId
     * @returns ReviewStats Successful Response
     * @throws ApiError
     */
    public static reviewStatsProductsProductIdReviewsStatsGet(
        productId: string,
    ): CancelablePromise<ReviewStats> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{product_id}/reviews/stats',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Mes avis
     * Retourne tous les reviews créés par l'utilisateur connecté.
     * @param skip
     * @param limit
     * @returns ReviewOut Successful Response
     * @throws ApiError
     */
    public static getMyReviewsProductsProductIdReviewsMyreviewGet(
        skip?: number,
        limit: number = 10,
    ): CancelablePromise<Array<ReviewOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{product_id}/reviews/myreview',
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
     * Read Review
     * @param productId
     * @param reviewId
     * @returns ReviewOut Successful Response
     * @throws ApiError
     */
    public static readReviewProductsProductIdReviewsReviewIdGet(
        productId: string,
        reviewId: string,
    ): CancelablePromise<ReviewOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{product_id}/reviews/{review_id}',
            path: {
                'product_id': productId,
                'review_id': reviewId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Edit Review
     * @param productId
     * @param reviewId
     * @param requestBody
     * @returns ReviewOut Successful Response
     * @throws ApiError
     */
    public static editReviewProductsProductIdReviewsReviewIdPut(
        productId: string,
        reviewId: string,
        requestBody: ReviewUpdate,
    ): CancelablePromise<ReviewOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/products/{product_id}/reviews/{review_id}',
            path: {
                'product_id': productId,
                'review_id': reviewId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove Review
     * @param productId
     * @param reviewId
     * @returns void
     * @throws ApiError
     */
    public static removeReviewProductsProductIdReviewsReviewIdDelete(
        productId: string,
        reviewId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/products/{product_id}/reviews/{review_id}',
            path: {
                'product_id': productId,
                'review_id': reviewId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
