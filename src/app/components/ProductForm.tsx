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

type FormValues = ProductCreate & {
  images: Array<{
    url: string;
    alt_text?: string;
    order?: number;
    file?: File;
  }>;
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
      price: 0,
      in_stock: true,
      images: [{ url: "", order: 1, alt_text: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control,
  });

  const [message, setMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: ProductCreate = {
      style_id: data.style_id,
      name: data.name,
      full_name: data.full_name,
      price: data.price,
      in_stock: data.in_stock,
      images: data.images.map(({ url, alt_text, order }) => ({
        url,
        alt_text,
        order,
      })),
    };

    try {
      const created = await ProductsService.createProductProductsPost(payload);
      setMessage(`✅ Produit créé avec l’ID : ${created.id}`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de la création");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto space-y-6 p-6 bg-white rounded shadow"
    >
      {message && (
        <div className="px-4 py-2 bg-green-100 rounded">{message}</div>
      )}

      {/* style_id */}
      <div>
        <label className="block font-medium">Style ID *</label>
        <input
          {...register("style_id", { required: "Requis" })}
          className="w-full border rounded px-2 py-1"
        />
        {errors.style_id && (
          <p className="text-red-500 text-sm">{errors.style_id.message}</p>
        )}
      </div>

      {/* name */}
      <div>
        <label className="block font-medium">Nom court *</label>
        <input
          {...register("name", { required: "Requis" })}
          className="w-full border rounded px-2 py-1"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* full_name */}
      <div>
        <label className="block font-medium">Nom complet *</label>
        <input
          {...register("full_name", { required: "Requis" })}
          className="w-full border rounded px-2 py-1"
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm">{errors.full_name.message}</p>
        )}
      </div>

      {/* price */}
      <div>
        <label className="block font-medium">Prix (€) *</label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Requis",
            valueAsNumber: true,
            min: { value: 0, message: "Doit être ≥ 0" },
          })}
          className="w-full border rounded px-2 py-1"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* in_stock */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("in_stock")} id="in_stock" />
        <label htmlFor="in_stock">En stock</label>
      </div>

      {/* ---------------- Images ---------------- */}
      <fieldset className="space-y-4">
        <legend className="font-medium">Images</legend>

        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="grid grid-cols-6 gap-2 items-start border-b pb-4"
          >
            {/* File Input */}
            <div className="col-span-3">
              <label className="block text-sm">Fichier *</label>
              <Controller
                control={control}
                name={`images.${idx}.file`}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setValue(
                            `images.${idx}.url`,
                            reader.result as string,
                            { shouldValidate: true }
                          );
                          onChange(file);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full"
                  />
                )}
              />
            </div>

            {/* Order */}
            <div className="col-span-1">
              <label className="block text-sm">Ordre</label>
              <input
                type="number"
                {...register(`images.${idx}.order` as const, {
                  valueAsNumber: true,
                  min: 1,
                })}
                className="w-full border rounded px-2 py-1"
              />
            </div>

            {/* Supprimer */}
            <div className="col-span-1 text-right">
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-red-500"
              >
                Suppr.
              </button>
            </div>

            {/* Alt + Aperçu */}
            <div className="col-span-6 flex gap-4 items-center">
              {field.url && (
                <img
                  src={field.url}
                  alt={field.alt_text || `Aperçu ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <label className="block text-sm">Alt text</label>
                <input
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
            append({ url: "", order: fields.length + 1, alt_text: "" })
          }
          className="mt-2 text-blue-600"
        >
          + Ajouter une image
        </button>
      </fieldset>

      <div className="text-right">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Envoi…" : "Créer le produit"}
        </button>
      </div>
    </form>
  );
}
