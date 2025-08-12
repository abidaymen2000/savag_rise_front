/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderOut } from '../models/OrderOut';
import type { PasswordChange } from '../models/PasswordChange';
import type { ReviewOut } from '../models/ReviewOut';
import type { UserOut } from '../models/UserOut';
import type { UserUpdate } from '../models/UserUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProfileService {
    /**
     * Récupérer le profil de l’utilisateur connecté
     * @returns UserOut Successful Response
     * @throws ApiError
     */
    public static readProfileProfileMeGet(): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profile/me',
        });
    }
    /**
     * Mettre à jour son profil
     * @param requestBody
     * @returns UserOut Successful Response
     * @throws ApiError
     */
    public static updateProfileProfileMePatch(
        requestBody: UserUpdate,
    ): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/profile/me',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Récupérer tous mes avis
     * Retourne la liste des reviews que l’utilisateur connecté
     * a publiées, tous produits confondus.
     * @param skip
     * @param limit
     * @returns ReviewOut Successful Response
     * @throws ApiError
     */
    public static getMyReviewsProfileReviewsGet(
        skip?: number,
        limit: number = 10,
    ): CancelablePromise<Array<ReviewOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profile/reviews',
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
     * Changer son mot de passe
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static changePasswordProfileChangePasswordPost(
        requestBody: PasswordChange,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/profile/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Historique des commandes de l’utilisateur
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static listMyOrdersProfileOrdersGet(): CancelablePromise<Array<OrderOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profile/orders',
        });
    }
    /**
     * Récupérer une de ses commandes par son ID
     * @param orderId ID de la commande
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static profileGetOneOrderProfileOrdersOrderIdGet(
        orderId: string,
    ): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profile/orders/{order_id}',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
