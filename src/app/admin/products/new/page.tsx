"use client"

import { SidebarTrigger } from "@/app/components/ui/sidebar"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Upload, ArrowLeft, Package } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"
import { ProductCreate } from "@/app/services/generated/models/ProductCreate"
import { ProductsService } from "@/app/services/generated"

export default function NewProductPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const [formData, setFormData] = useState<ProductCreate>({
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
    zip_length_cm: null,
    zip_color_options: null,
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
    images: [],
  })

  const handleChange = (id: keyof ProductCreate, value: any) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)
      setSelectedImages(prev => [...prev, ...fileArray])
    }
  }

  const handleSaveProduct = async () => {
    try {
      const product = await ProductsService.createProductProductsPost(formData)
      console.log("Product created:", product)

  if (product.id && selectedImages.length > 0) {
  for (const image of selectedImages) {
    await ProductsService.uploadImageToProductProductsProductIdUploadImagePost(product.id, {
      file: image,
    });
  }
}


      alert("Product created successfully")
    } catch (error) {
      console.error("Failed to create product:", error)
      alert("An error occurred while creating the product.")
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
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Column 1 */}
          <div className="space-y-6">
            {/* Identification */}
            <Card>
              <CardHeader><CardTitle>Identification</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["style_id", "name", "full_name", "sku"].map(id => (
                    <div key={id} className="space-y-1">
                      <Label htmlFor={id}>{id.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</Label>
                      <Input
                        id={id}
                        value={formData[id as keyof ProductCreate] as string}
                        onChange={(e) => handleChange(id as keyof ProductCreate, e.target.value)}
                        placeholder={`Enter ${id}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inventory & Pricing */}
            <Card>
              <CardHeader><CardTitle>Inventory & Pricing</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="in_stock">In Stock</Label>
                    <Input
                      id="in_stock"
                      type="number"
                      value={formData.in_stock ? 1 : 0}
                      onChange={(e) => handleChange("in_stock", Boolean(Number(e.target.value)))}
                    />
                  </div>
                  {["fabric", "grammage"].map(id => (
                    <div key={id} className="space-y-1">
                      <Label htmlFor={id}>{id}</Label>
                      <Input
                        id={id}
                        value={formData[id as keyof ProductCreate] as string}
                        onChange={(e) => handleChange(id as keyof ProductCreate, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload Images */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Images</CardTitle>
                <CardDescription>Add product visuals (front, back, details...)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center min-h-[200px]">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <Button variant="outline" size="sm" type="button" onClick={handleUploadClick}>Choose Files</Button>
                  <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {selectedImages.map((file, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <img src={URL.createObjectURL(file)} alt={`preview-${index}`} className="w-full h-40 object-cover" />
                          <div className="p-2 text-xs text-muted-foreground truncate">{file.name}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            {/* Product Description */}
            <Card>
              <CardHeader><CardTitle>Product Description</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  ["description", "textarea"],
                  ["style"],
                  ["season"]
                ].map(([id, type]) => (
                  <div key={id} className="space-y-2">
                    <Label htmlFor={id}>{id}</Label>
                    {type === "textarea" ? (
                      <Textarea
                        id={id}
                        value={formData[id as keyof ProductCreate] as string}
                        onChange={(e) => handleChange(id as keyof ProductCreate, e.target.value)}
                      />
                    ) : (
                      <Input
                        id={id}
                        value={formData[id as keyof ProductCreate] as string}
                        onChange={(e) => handleChange(id as keyof ProductCreate, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Design Details */}
            <Card>
              <CardHeader><CardTitle>Design Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  "collar_type", "zip_type", "zip_length_cm", "zip_color_options",
                  "sleeve_finish", "hem_finish"
                ].map((id) => (
                  <div key={id} className="space-y-2">
                    <Label htmlFor={id}>{id}</Label>
                    <Input
                      id={id}
                      value={formData[id as keyof ProductCreate] as string}
                      onChange={(e) => handleChange(id as keyof ProductCreate, e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            {/* Embroidery & Markings */}
            <Card>
              <CardHeader><CardTitle>Embroidery & Markings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  "embroidery_position", "embroidery_text", "embroidery_size_cm", "embroidery_color",
                  "alternative_marking", "care_instructions"
                ].map((id) => (
                  <div key={id} className="space-y-2">
                    <Label htmlFor={id}>{id}</Label>
                    {id === "care_instructions" ? (
                      <Textarea
                        id={id}
                        value={formData[id as keyof ProductCreate] as string}
                        onChange={(e) => handleChange(id as keyof ProductCreate, e.target.value)}
                      />
                    ) : (
                      <Input
                        id={id}
                        value={formData[id as keyof ProductCreate] as string}
                        onChange={(e) => handleChange(id as keyof ProductCreate, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SEO & Tags (simplified) */}
          <Card>
  <CardHeader>
    <CardTitle>SEO & Tags</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Target Audience */}
    <div className="space-y-2">
      <Label htmlFor="target_audience">Target Audience</Label>
      <Input
        id="target_audience"
        value={formData.target_audience ?? ""}
        onChange={(e) =>
          handleChange("target_audience" as keyof ProductCreate, e.target.value)
        }
      />
    </div>

    {/* Inspiration */}
    <div className="space-y-2">
      <Label htmlFor="inspiration">Inspiration</Label>
      <Textarea
        id="inspiration"
        value={formData.inspiration ?? ""}
        onChange={(e) =>
          handleChange("inspiration" as keyof ProductCreate, e.target.value)
        }
        className="min-h-[80px]"
      />
    </div>
  </CardContent>
</Card>

          </div>
        </div>
      </main>
    </div>
  )
}
