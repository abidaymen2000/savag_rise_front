/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_image_to_product_products__product_id__upload_image_post } from '../models/Body_upload_image_to_product_products__product_id__upload_image_post';
import type { ImageUploadOut } from '../models/ImageUploadOut';
import type { ProductCreate } from '../models/ProductCreate';
import type { ProductOut } from '../models/ProductOut';
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
     * Read Product
     * @param productId
     * @returns ProductOut Successful Response
     * @throws ApiError
     */
    public static readProductProductsProductIdGet(
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
    /**
     * Upload une image puis l'ajoute à la collection du produit
     * @param productId
     * @param formData
     * @returns ImageUploadOut Successful Response
     * @throws ApiError
     */
    public static uploadImageToProductProductsProductIdUploadImagePost(
        productId: string,
        formData: Body_upload_image_to_product_products__product_id__upload_image_post,
    ): CancelablePromise<ImageUploadOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/products/{product_id}/upload-image',
            path: {
                'product_id': productId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
