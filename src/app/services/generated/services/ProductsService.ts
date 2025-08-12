/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductCreate } from '../models/ProductCreate';
import type { ProductOut } from '../models/ProductOut';
import type { ProductUpdate } from '../models/ProductUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * Create Product
     * @param requestBody
     * @returns ProductOut Successful Response
     * @throws ApiError
     */
    public static createProductProductsPost(
        requestBody: ProductCreate,
    ): CancelablePromise<ProductOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * List Products
     * @param skip
     * @param limit
     * @returns ProductOut Successful Response
     * @throws ApiError
     */
    public static listProductsProductsGet(
        skip?: number,
        limit: number = 10,
    ): CancelablePromise<Array<ProductOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/',
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
     * Recherche plein-texte + filtres + tri + pagination
     * @param text Terme plein-texte
     * @param minPrice
     * @param maxPrice
     * @param color
     * @param size
     * @param skip
     * @param limit
     * @param sort
     * @returns ProductOut Successful Response
     * @throws ApiError
     */
    public static searchProductsEndpointProductsSearchGet(
        text?: (string | null),
        minPrice?: (number | null),
        maxPrice?: (number | null),
        color?: (string | null),
        size?: (string | null),
        skip?: number,
        limit: number = 10,
        sort?: (string | null),
    ): CancelablePromise<Array<ProductOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/search',
            query: {
                'text': text,
                'min_price': minPrice,
                'max_price': maxPrice,
                'color': color,
                'size': size,
                'skip': skip,
                'limit': limit,
                'sort': sort,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Met à jour un produit existant
     * @param productId
     * @param requestBody
     * @returns ProductOut Successful Response
     * @throws ApiError
     */
    public static updateProductEndpointProductsProductIdPut(
        productId: string,
        requestBody: ProductUpdate,
    ): CancelablePromise<ProductOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/products/{product_id}',
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
     * Supprime un produit et ses variantes
     * @param productId
     * @returns void
     * @throws ApiError
     */
    public static deleteProductProductsProductIdDelete(
        productId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/products/{product_id}',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Récupère un produit par son ID
     * @param productId
     * @returns ProductOut Successful Response
     * @throws ApiError
     */
    public static getProductEndpointProductsProductIdGet(
        productId: string,
    ): CancelablePromise<ProductOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{product_id}',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
