/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryCreate } from '../models/CategoryCreate';
import type { CategoryOut } from '../models/CategoryOut';
import type { CategoryUpdate } from '../models/CategoryUpdate';
import type { ProductOut } from '../models/ProductOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoriesService {
    /**
     * Read Categories
     * @returns CategoryOut Successful Response
     * @throws ApiError
     */
    public static readCategoriesCategoriesGet(): CancelablePromise<Array<CategoryOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/',
        });
    }
    /**
     * Create New Category
     * @param requestBody
     * @returns CategoryOut Successful Response
     * @throws ApiError
     */
    public static createNewCategoryCategoriesPost(
        requestBody: CategoryCreate,
    ): CancelablePromise<CategoryOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/categories/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Category
     * @param categoryId
     * @returns CategoryOut Successful Response
     * @throws ApiError
     */
    public static readCategoryCategoriesCategoryIdGet(
        categoryId: string,
    ): CancelablePromise<CategoryOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/{category_id}',
            path: {
                'category_id': categoryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Modify Category
     * @param categoryId
     * @param requestBody
     * @returns CategoryOut Successful Response
     * @throws ApiError
     */
    public static modifyCategoryCategoriesCategoryIdPut(
        categoryId: string,
        requestBody: CategoryUpdate,
    ): CancelablePromise<CategoryOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/categories/{category_id}',
            path: {
                'category_id': categoryId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove Category
     * @param categoryId
     * @returns void
     * @throws ApiError
     */
    public static removeCategoryCategoriesCategoryIdDelete(
        categoryId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/categories/{category_id}',
            path: {
                'category_id': categoryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Products By Category
     * @param categoryName
     * @param skip
     * @param limit
     * @returns ProductOut Successful Response
     * @throws ApiError
     */
    public static productsByCategoryCategoriesCategoryNameProductsGet(
        categoryName: string,
        skip?: number,
        limit: number = 10,
    ): CancelablePromise<Array<ProductOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/{category_name}/products',
            path: {
                'category_name': categoryName,
            },
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
     * Ajoute un produit existant à une catégorie existante
     * @param categoryId
     * @param productId
     * @returns ProductOut Successful Response
     * @throws ApiError
     */
    public static addProductToCategoryCategoriesCategoryIdProductsProductIdPost(
        categoryId: string,
        productId: string,
    ): CancelablePromise<ProductOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/categories/{category_id}/products/{product_id}',
            path: {
                'category_id': categoryId,
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
