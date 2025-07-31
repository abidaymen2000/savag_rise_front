/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageCreate } from './ImageCreate';
import type { VariantCreate } from './VariantCreate';
export type ProductCreate = {
    style_id: string;
    name: string;
    full_name: string;
    sku?: (string | null);
    description?: (string | null);
    packaging?: (string | null);
    style?: (string | null);
    season?: (string | null);
    target_audience?: (string | null);
    inspiration?: (string | null);
    fabric?: (string | null);
    composition?: (Record<string, number> | null);
    grammage?: (string | null);
    collar_type?: (string | null);
    zip_type?: (string | null);
    zip_length_cm?: (number | null);
    zip_color_options?: (Array<string> | null);
    sleeve_finish?: (string | null);
    hem_finish?: (string | null);
    logo_placement?: (string | null);
    label_detail?: (string | null);
    embroidery_position?: (string | null);
    embroidery_text?: (string | null);
    embroidery_size_cm?: (string | null);
    embroidery_color?: (string | null);
    alternative_marking?: (string | null);
    care_instructions?: (string | null);
    price: number;
    in_stock?: boolean;
    images?: Array<ImageCreate>;
    variants?: (Array<VariantCreate> | null);
};

