// src/components/ProductForm.tsx
"use client";

import { useState } from "react";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
import type { ProductCreate } from "../services/generated/models/ProductCreate";
import { ProductsService } from "../services/generated/services/ProductsService";
import { UploadService } from "../services/generated/services/UploadService";
import type { Body_upload_image_upload_image_post } from "../services/generated/models/Body_upload_image_upload_image_post";

// --- Types personnalisés pour le formulaire ---
interface ImageFormItem {
  url: string;
  alt_text?: string;
  order?: number;
  file?: File;
}
interface CompositionForm {
  viscose: number;
  coton: number;
  elasthanne: number;
}
type FormValues = Omit<ProductCreate, "images" | "composition"> & {
  composition: CompositionForm;
  images: ImageFormItem[];
};

export default function ProductForm() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      style_id: "",
      name: "",
      full_name: "",
      sku: "",
      description: "",
      packaging: "",
      style: "",
      season: "",
      target_audience: "",
      inspiration: "",
      price: 0,
      in_stock: true,
      fabric: "",
      composition: { viscose: 0, coton: 0, elasthanne: 0 },
      grammage: "",
      collar_type: "",
      zip_type: "",
      zip_length_cm: 0,
      zip_color_options: [""],
      sleeve_finish: "",
      hem_finish: "",
      logo_placement: "",
      label_detail: "",
      embroidery_position: "",
      embroidery_text: "",
      embroidery_size_cm: "",
      embroidery_color: "",
      alternative_marking: "",
      care_instructions: "",
      images: [{ url: "", alt_text: "", order: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control,
  });

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Appel au service multipart généré
  async function upload(file: File): Promise<string> {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const body = form as unknown as Body_upload_image_upload_image_post;
    const resp = await UploadService.uploadImageUploadImagePost(body);
    setUploading(false);
    return resp.url;
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Reconstruction du payload final
    const payload: ProductCreate = {
      style_id: data.style_id,
      name: data.name,
      full_name: data.full_name,
      sku: data.sku || undefined,
      description: data.description || undefined,
      packaging: data.packaging,
      style: data.style,
      season: data.season,
      target_audience: data.target_audience,
      inspiration: data.inspiration,
      price: data.price,
      in_stock: data.in_stock,
      fabric: data.fabric,
      composition: {
        viscose: data.composition.viscose,
        coton: data.composition.coton,
        elasthanne: data.composition.elasthanne,
      },
      grammage: data.grammage,
      collar_type: data.collar_type,
      zip_type: data.zip_type,
      zip_length_cm: data.zip_length_cm,
      // <<< ici, on évite le undefined
      zip_color_options: (data.zip_color_options ?? []).filter((s) => !!s),
      sleeve_finish: data.sleeve_finish,
      hem_finish: data.hem_finish,
      logo_placement: data.logo_placement,
      label_detail: data.label_detail,
      embroidery_position: data.embroidery_position || undefined,
      embroidery_text: data.embroidery_text || undefined,
      embroidery_size_cm: data.embroidery_size_cm || undefined,
      embroidery_color: data.embroidery_color || undefined,
      alternative_marking: data.alternative_marking || undefined,
      care_instructions: data.care_instructions,
      images: data.images.map(({ url, alt_text, order }) => ({
        url,
        alt_text,
        order,
      })),
    };

    try {
      const created = await ProductsService.createProductProductsPost(payload);
      setMessage(`✅ Produit créé : ${created.id}`);
    } catch {
      setMessage("❌ Une erreur est survenue.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-6"
    >
      {message && (
        <div className="px-4 py-2 bg-green-100 text-green-800 rounded">
          {message}
        </div>
      )}

      {/* Identification */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Style ID*</label>
          <input
            {...register("style_id", { required: "Requis" })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.style_id && (
            <p className="text-red-500 text-sm">{errors.style_id.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Nom court*</label>
          <input
            {...register("name", { required: "Requis" })}
            className="w-full border rounded px-2 py-1"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
      </div>

      {/* Nom complet */}
      <div>
        <label className="block font-medium">Nom complet*</label>
        <input
          {...register("full_name", { required: "Requis" })}
          className="w-full border rounded px-2 py-1"
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm">{errors.full_name.message}</p>
        )}
      </div>

      {/* SKU */}
      <div>
        <label className="block font-medium">SKU</label>
        <input
          {...register("sku")}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          {...register("description")}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      {/* Packaging */}
      <div>
        <label className="block font-medium">Packaging*</label>
        <input
          {...register("packaging", { required: "Requis" })}
          className="w-full border rounded px-2 py-1"
        />
        {errors.packaging && (
          <p className="text-red-500 text-sm">{errors.packaging.message}</p>
        )}
      </div>

      {/* Positionnement */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { key: "style", label: "Style*" },
          { key: "season", label: "Saison*" },
          { key: "target_audience", label: "Public cible*" },
          { key: "inspiration", label: "Inspiration*" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block font-medium">{label}</label>
            <input
              {...register(key as any, { required: "Requis" })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        ))}
      </div>

      {/* Tissu, Grammage & Prix */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Matière*</label>
          <input
            {...register("fabric", { required: "Requis" })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Grammage*</label>
          <input
            {...register("grammage", { required: "Requis" })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Prix (€)*</label>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Requis",
              valueAsNumber: true,
              min: { value: 0, message: "≥ 0" },
            })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Composition */}
      <div className="grid grid-cols-3 gap-4">
        {(["viscose", "coton", "elasthanne"] as const).map((mat) => (
          <div key={mat}>
            <label className="block font-medium">{mat} (%)</label>
            <input
              type="number"
              step="1"
              {...register(`composition.${mat}`, {
                required: "Requis",
                valueAsNumber: true,
                min: 0,
                max: 100,
              })}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        ))}
      </div>

      {/* Col & Zip */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Type de col*</label>
          <input
            {...register("collar_type", { required: "Requis" })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Type de zip*</label>
          <input
            {...register("zip_type", { required: "Requis" })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Longueur zip (cm)*</label>
          <input
            type="number"
            {...register("zip_length_cm", {
              required: "Requis",
              valueAsNumber: true,
            })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div className="col-span-2">
          <label className="block font-medium">Couleurs zip</label>
          <input
            {...register("zip_color_options.0")}
            placeholder="Sépare par , si plusieurs"
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Finitions, Branding, Broderie, Entretien */}
      {/* … */}
      {/* In stock */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("in_stock")} id="in_stock" />
        <label htmlFor="in_stock">En stock</label>
      </div>

      {/* Photos (upload-image) */}
      <fieldset className="space-y-4">
        <legend className="font-medium">Photos *</legend>

        {fields.map((field, idx) => (
          <div key={field.id} className="grid grid-cols-6 gap-4 items-start">
            <div className="col-span-3">
              <label className="block text-sm">Fichier *</label>
              <Controller
                control={control}
                name={`images.${idx}.file`}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (<
                  input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const url = await upload(file);
                      setValue(`images.${idx}.url`, url, {
                        shouldValidate: true,
                      });
                      onChange(file);
                    }}
                    className="w-full"
                  />
                )}
              />
              {uploading && <p className="text-sm">Upload en cours…</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-sm">Ordre</label>
              <input
                type="number"
                {...register(`images.${idx}.order` as const, {
                  valueAsNumber: true,
                })}
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="col-span-1 text-right">
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-red-500"
              >
                Suppr.
              </button>
            </div>

            <div className="col-span-6 flex gap-4 items-center">
              {field.url && (
                <img
                  src={field.url}
                  alt={field.alt_text || `Photo ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <label className="block text-sm">Alt text</label
                ><input
                  {...register(`images.${idx}.alt_text` as const)}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({ url: "", alt_text: "", order: fields.length + 1 })
          }
          className="mt-2 text-blue-600"
        >
          + Ajouter une photo
        </button>
      </fieldset>

      <div className="text-right">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? "Envoi…" : "Créer le produit"}
        </button>
      </div>
    </form>
  );
}
