/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_image_upload_image_post } from '../models/Body_upload_image_upload_image_post';
import type { ImageUploadOut } from '../models/ImageUploadOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UploadService {
    /**
     * Upload une image et renvoie son URL publique
     * @param formData
     * @returns ImageUploadOut Successful Response
     * @throws ApiError
     */
    public static uploadImageUploadImagePost(
        formData: Body_upload_image_upload_image_post,
    ): CancelablePromise<ImageUploadOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/upload-image',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
