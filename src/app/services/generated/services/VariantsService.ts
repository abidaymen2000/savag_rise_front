/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_variant_color_image_products__product_id__variants__color__images_post } from '../models/Body_upload_variant_color_image_products__product_id__variants__color__images_post';
import type { ImageOut } from '../models/ImageOut';
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
     * Créer une variante (couleur + tailles)
     * Body attendu :
     * {
         * "color": "noir",
         * "sizes": [{"size":"S","stock":7},…],
         * "images": []
         * }
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
         * Met à jour le stock d'une taille pour une couleur
         * @param productId
         * @param color
         * @param size
         * @param newStock
         * @returns void
         * @throws ApiError
         */
        public static changeStockProductsProductIdVariantsColorSizesSizeStockPatch(
            productId: string,
            color: string,
            size: string,
            newStock: number,
        ): CancelablePromise<void> {
            return __request(OpenAPI, {
                method: 'PATCH',
                url: '/products/{product_id}/variants/{color}/sizes/{size}/stock',
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
        /**
         * Uploader une image pour la variante couleur
         * Multipart/form-data { file: <l'image> }
         * @param productId
         * @param color
         * @param formData
         * @returns ImageOut Successful Response
         * @throws ApiError
         */
        public static uploadVariantColorImageProductsProductIdVariantsColorImagesPost(
            productId: string,
            color: string,
            formData: Body_upload_variant_color_image_products__product_id__variants__color__images_post,
        ): CancelablePromise<ImageOut> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/products/{product_id}/variants/{color}/images',
                path: {
                    'product_id': productId,
                    'color': color,
                },
                formData: formData,
                mediaType: 'multipart/form-data',
                errors: {
                    422: `Validation Error`,
                },
            });
        }
        /**
         * Supprimer une image de la variante couleur
         * @param productId
         * @param color
         * @param imageId
         * @returns void
         * @throws ApiError
         */
        public static deleteVariantColorImageProductsProductIdVariantsColorImagesImageIdDelete(
            productId: string,
            color: string,
            imageId: string,
        ): CancelablePromise<void> {
            return __request(OpenAPI, {
                method: 'DELETE',
                url: '/products/{product_id}/variants/{color}/images/{image_id}',
                path: {
                    'product_id': productId,
                    'color': color,
                    'image_id': imageId,
                },
                errors: {
                    422: `Validation Error`,
                },
            });
        }
    }
