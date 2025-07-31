/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_token_auth_token_post } from '../models/Body_login_token_auth_token_post';
import type { PasswordReset } from '../models/PasswordReset';
import type { PasswordResetRequest } from '../models/PasswordResetRequest';
import type { UserCreate } from '../models/UserCreate';
import type { UserOut } from '../models/UserOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Créer un compte et envoyer un email de vérification
     * @param requestBody
     * @returns UserOut Successful Response
     * @throws ApiError
     */
    public static signupAuthSignupPost(
        requestBody: UserCreate,
    ): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Obtenir un JWT après login (email vérifié requis)
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static loginTokenAuthTokenPost(
        formData: Body_login_token_auth_token_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Vérifier un email via token
     * @param token Token de vérification reçu par email
     * @returns any Successful Response
     * @throws ApiError
     */
    public static verifyEmailAuthVerifyEmailGet(
        token: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/verify-email',
            query: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Demande de reset de mot de passe
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static forgotPasswordAuthForgotPasswordPost(
        requestBody: PasswordResetRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Réinitialisation du mot de passe via token
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static resetPasswordAuthResetPasswordPost(
        requestBody: PasswordReset,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/reset-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
