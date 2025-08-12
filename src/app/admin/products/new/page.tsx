"use client"

import { SidebarTrigger } from "@/app/components/ui/sidebar"
import { Button } from "@/app/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Upload, ArrowLeft, Package, X } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ProductCreate } from "@/app/services/generated/models/ProductCreate"
import {
  CategoriesService,
  ProductsService,
  VariantsService,
  UploadService,
} from "@/app/services/generated"
import type { CategoryCreate } from "@/app/services/generated/models/CategoryCreate"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs"
import type { VariantCreate } from "@/app/services/generated/models/VariantCreate"
import type { Body_upload_variant_color_image_products__product_id__variants__color__images_post } from "@/app/services/generated/models/Body_upload_variant_color_image_products__product_id__variants__color__images_post"

export default function NewProductPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedGeneralImages, setSelectedGeneralImages] = useState<File[]>([]) // For general product images, if any
  const [categories, setCategories] = useState<CategoryCreate[]>([])
  const [variants, setVariants] = useState<VariantCreate[]>([]) // Local variants to create
  const [newColor, setNewColor] = useState<string>("")
  const [newSize, setNewSize] = useState<Record<string, string>>({}) // New size per color
  const [newStock, setNewStock] = useState<Record<string, number>>({}) // New stock per color
  const [variantFiles, setVariantFiles] = useState<Record<string, File[]>>({}) // Files per color

  const [formData, setFormData] = useState<
    ProductCreate & { category_id?: string }
  >({
    style_id: "",
    name: "",
    full_name: "",
    sku: "",
    description: "",
    packaging: null,
    style: "",
    season: "",
    target_audience: "",
    inspiration: "",
    fabric: "",
    composition: null,
    grammage: "",
    collar_type: "",
    zip_type: "",
    zip_length_cm: 0,
    zip_color_options: "",
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
    price: 0,
    in_stock: false,
    category_id: "",
  })

  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedVariantImages, setSelectedVariantImages] = useState<File[]>([]) // Temporary selected files for variant
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle")

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await CategoriesService.readCategoriesCategoriesGet()
        setCategories(categoriesResponse)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchData()
  }, [])

  const handleChange = (
    id: keyof (ProductCreate & { category_id?: string }),
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleAddColor = () => {
    if (newColor && !variants.some((v) => v.color === newColor)) {
      setVariants((prev) => [...prev, { color: newColor, sizes: [], images: [] }])
      setNewColor("")
    } else {
      alert("Color already exists or is invalid.")
    }
  }

  const handleAddSize = (color: string) => {
    const size = newSize[color] || ""
    const stock = newStock[color] || 0
    if (size) {
      setVariants((prev) =>
        prev.map((v) =>
          v.color === color
            ? { ...v, sizes: [...v.sizes, { size, stock }] }
            : v
        )
      )
      setNewSize((prev) => ({ ...prev, [color]: "" }))
      setNewStock((prev) => ({ ...prev, [color]: 0 }))
    } else {
      alert("Please enter a size.")
    }
  }

  const handleRemoveSize = (color: string, size: string) => {
    setVariants((prev) =>
      prev.map((v) =>
        v.color === color
          ? { ...v, sizes: v.sizes.filter((s) => s.size !== size) }
          : v
      )
    )
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)
      setSelectedVariantImages((prev) => [...prev, ...fileArray])
    }
  }

  const handleAddVariantImages = () => {
    if (!selectedColor) {
      alert("Please select a variant color before adding images.")
      return
    }
    if (selectedVariantImages.length === 0) {
      alert("Please select images to add.")
      return
    }

    setVariantFiles((prev) => ({
      ...prev,
      [selectedColor]: [
        ...(prev[selectedColor] ?? []),
        ...selectedVariantImages,
      ],
    }))
    setSelectedVariantImages([])
    setSelectedColor("")
  }

  const handleSaveProduct = async () => {
    try {
      setUploadStatus("uploading")

      // Upload general images if any (assuming selectedGeneralImages for general, but UI not there, so empty)
      const generalImageUrls: string[] = []
      if (selectedGeneralImages.length > 0) {
        const uploadResponse = await UploadService.uploadImagesUploadImagesPost({
          files: selectedGeneralImages,
        })
        if (uploadResponse?.urls) {
          generalImageUrls.push(...uploadResponse.urls)
        } else {
          throw new Error("General image upload failed")
        }
      }

      const productData = {
        ...formData,
        images: generalImageUrls.map((url) => ({ url })),
        category_id: formData.category_id,
      }

      // Create product
      const createdProduct = await ProductsService.createProductProductsPost(productData)
      const productId = createdProduct.id // Assume response has id

      // Create variants and upload their images
      for (const variant of variants) {
        // Create variant
        await VariantsService.createVariantProductsProductIdVariantsPost(productId, variant)

        // Upload images for this color
        const files = variantFiles[variant.color] || []
        for (const file of files) {
          const formData: Body_upload_variant_color_image_products__product_id__variants__color__images_post = { file }
          await VariantsService.uploadVariantColorImageProductsProductIdVariantsColorImagesPost(
            productId,
            variant.color,
            formData
          )
        }
      }

      alert("Product and variants created successfully")
      setUploadStatus("success")

      // Reset form
      setFormData({
        style_id: "",
        name: "",
        full_name: "",
        sku: "",
        description: "",
        packaging: null,
        style: "",
        season: "",
        target_audience: "",
        inspiration: "",
        fabric: "",
        composition: null,
        grammage: "",
        collar_type: "",
        zip_type: "",
        zip_length_cm: 0,
        zip_color_options: "",
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
        price: 0,
        in_stock: false,
        category_id: "",
      })
      setSelectedGeneralImages([])
      setSelectedVariantImages([])
      setSelectedColor("")
      setVariantFiles({})
      setVariants([])
      setNewColor("")
      setNewSize({})
      setNewStock({})
    } catch (error) {
      console.error(error)
      setUploadStatus("error")
      alert("An error occurred while creating the product and variants.")
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div className="flex flex-1 items-center gap-2">
          <Package className="h-5 w-5" />
          <h1 className="text-lg font-semibold">Add Product Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button onClick={handleSaveProduct}>Publish</Button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["style_id", "name", "full_name", "sku"].map((id) => (
                        <div key={id} className="space-y-1">
                          <Label htmlFor={id}>
                            {id
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Label>
                          <Input
                            id={id}
                            value={(formData[id as keyof ProductCreate] ?? "") as string}
                            onChange={(e) =>
                              handleChange(id as keyof ProductCreate, e.target.value)
                            }
                            placeholder={`Enter ${id}`}
                          />
                        </div>
                      ))}

                      {/* Category Select */}
                      <div className="space-y-1">
                        <Label htmlFor="category_id">Category</Label>
                        <Select
                          onValueChange={(value) => handleChange("category_id", value)}
                          defaultValue={formData.category_id ?? ""}
                        >
                          <SelectTrigger id="category_id" className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {[
                        ["description", "textarea"],
                        ["style"],
                        ["season"],
                      ].map(([id, type]) => (
                        <div key={id} className="space-y-2">
                          <Label htmlFor={id}>
                            {id
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Label>
                          {type === "textarea" ? (
                            <Textarea
                              id={id}
                              value={formData[id as keyof ProductCreate] as string}
                              onChange={(e) =>
                                handleChange(id as keyof ProductCreate, e.target.value)
                              }
                            />
                          ) : (
                            <Input
                              id={id}
                              value={formData[id as keyof ProductCreate] as string}
                              onChange={(e) =>
                                handleChange(id as keyof ProductCreate, e.target.value)
                              }
                            />
                          )}
                        </div>
                      ))}

                      <div className="space-y-1">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            handleChange("price", parseFloat(e.target.value))
                          }
                        />
                      </div>

                      <div className="space-y-1 flex items-center gap-2">
                        <Label htmlFor="in_stock">In Stock</Label>
                        <input
                          id="in_stock"
                          type="checkbox"
                          checked={formData.in_stock}
                          onChange={(e) => handleChange("in_stock", e.target.checked)}
                          className="h-5 w-5"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Design Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "collar_type",
                      "zip_type",
                      "zip_length_cm",
                      "zip_color_options",
                      "sleeve_finish",
                      "hem_finish",
                    ].map((id) => (
                      <div key={id} className="space-y-2">
                        <Label htmlFor={id}>
                          {id
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Label>
                        <Input
                          id={id}
                          value={
                            formData[id as keyof ProductCreate] !== null
                              ? String(formData[id as keyof ProductCreate])
                              : ""
                          }
                          onChange={(e) =>
                            handleChange(id as keyof ProductCreate, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Upload Variant Images</CardTitle>
                <CardDescription>
                  Select a color and add images for that variant.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Variant color dropdown */}
                <div className="mb-4 max-w-xs">
                  <Label htmlFor="variant_color">Variant Color</Label>
                  <Select
                    onValueChange={setSelectedColor}
                    value={selectedColor}
                  >
                    <SelectTrigger id="variant_color" className="w-full">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {variants.map((variant) => (
                        <SelectItem key={variant.color} value={variant.color}>
                          {variant.color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Upload zone */}
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center min-h-[200px]">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={handleUploadClick}
                  >
                    Choose Files
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {selectedVariantImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {selectedVariantImages.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="border rounded-lg overflow-hidden"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-2 text-xs text-muted-foreground truncate">
                            {file.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add button */}
                <div className="mt-4">
                  <Button
                    onClick={handleAddVariantImages}
                    disabled={uploadStatus === "uploading" || !selectedColor || selectedVariantImages.length === 0}
                  >
                    {selectedColor ? `Add Images to ${selectedColor}` : "Select a Color to Add"}
                  </Button>
                </div>

                {/* Show added files grouped by variant color */}
                {Object.entries(variantFiles).map(([color, files]) => (
                  <div key={color} className="mt-6">
                    <h3 className="font-semibold mb-2">
                      Added Images for Color: {color}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {files.map((file, idx) => (
                        <img
                          key={idx}
                          src={URL.createObjectURL(file)}
                          alt={`Added ${color} ${idx}`}
                          className="w-full h-32 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants">
            <Card>
              <CardHeader>
                <CardTitle>Create Variants</CardTitle>
                <CardDescription>
                  Add colors and sizes with stock for the product.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add new color */}
                <div className="flex gap-2 max-w-md">
                  <Input
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Enter new color (e.g., Red)"
                  />
                  <Button onClick={handleAddColor}>Add Color</Button>
                </div>

                {/* List variants */}
                {variants.map((variant) => (
                  <div key={variant.color} className="border p-4 rounded-lg space-y-4">
                    <h3 className="font-semibold">{variant.color}</h3>

                    {/* Current sizes */}
                    <div>
                      <Label>Sizes:</Label>
                      {variant.sizes.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {variant.sizes.map((s) => (
                            <li key={s.size} className="flex items-center gap-2">
                              {s.size} - Stock: {s.stock}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveSize(variant.color, s.size)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No sizes added yet.</p>
                      )}
                    </div>

                    {/* Add new size */}
                    <div className="flex gap-2">
                      <Input
                        value={newSize[variant.color] || ""}
                        onChange={(e) =>
                          setNewSize((prev) => ({ ...prev, [variant.color]: e.target.value }))
                        }
                        placeholder="Size (e.g., S)"
                      />
                      <Input
                        type="number"
                        value={newStock[variant.color] || 0}
                        onChange={(e) =>
                          setNewStock((prev) => ({ ...prev, [variant.color]: parseInt(e.target.value) || 0 }))
                        }
                        placeholder="Stock"
                      />
                      <Button onClick={() => handleAddSize(variant.color)}>Add Size</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory & Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        handleChange("price", parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-1 flex items-center gap-2">
                    <Label htmlFor="in_stock">In Stock</Label>
                    <input
                      id="in_stock"
                      type="checkbox"
                      checked={formData.in_stock}
                      onChange={(e) => handleChange("in_stock", e.target.checked)}
                      className="h-5 w-5"
                    />
                  </div>
                  {["fabric", "grammage"].map((id) => (
                    <div key={id} className="space-y-1">
                      <Label htmlFor={id}>{id}</Label>
                      <Input
                        id={id}
                        value={(formData[id as keyof ProductCreate] ?? "") as string}
                        onChange={(e) =>
                          handleChange(id as keyof ProductCreate, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Shipping details coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO & Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="target_audience">Target Audience</Label>
                  <Input
                    id="target_audience"
                    value={formData.target_audience ?? ""}
                    onChange={(e) =>
                      handleChange("target_audience", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inspiration">Inspiration</Label>
                  <Textarea
                    id="inspiration"
                    value={formData.inspiration ?? ""}
                    onChange={(e) =>
                      handleChange("inspiration", e.target.value)
                    }
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Embroidery & Markings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "embroidery_position",
                  "embroidery_text",
                  "embroidery_size_cm",
                  "embroidery_color",
                  "alternative_marking",
                  "care_instructions",
                ].map((id) => (
                  <div key={id} className="space-y-2">
                    <Label htmlFor={id}>{id.replace(/_/g, " ")}</Label>
                    {id === "care_instructions" ? (
                      <Textarea
                        id={id}
                        value={formData[id as keyof ProductCreate] as string}
                        onChange={(e) =>
                          handleChange(id as keyof ProductCreate, e.target.value)
                        }
                      />
                    ) : (
                      <Input
                        id={id}
                        value={formData[id as keyof ProductCreate] as string}
                        onChange={(e) =>
                          handleChange(id as keyof ProductCreate, e.target.value)
                        }
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}