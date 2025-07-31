"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SidebarTrigger } from "@/app/components/ui/sidebar"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { ArrowLeft, Package, Eye, Edit, Trash2, Copy } from "lucide-react"
import { ProductsService } from "@/app/services/generated"
import type { ProductCreate } from "@/app/services/generated/models/ProductCreate"
import type { ImageCreate } from "@/app/services/generated/models/ImageCreate"

export default function ProductViewPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductCreate | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (typeof id !== "string") return
    ProductsService.readProductProductsProductIdGet(id)
      .then(setProduct)
      .catch(() => setError("Failed to fetch product"))
  }, [id])

  // Placeholder total stock and total sold (replace with real logic if available)
  const totalStock = product?.in_stock ? 100 : 0
  const totalSold = 50

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!product) return <div className="p-6">Loading product...</div>

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
        <div className="flex flex-1 items-center gap-2">
          <Package className="h-5 w-5" />
          <h1 className="text-lg font-semibold">Product Details</h1>
          <Badge variant={product.in_stock ? "default" : "secondary"}>
            {product.in_stock ? "Published" : "Draft"}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/products/${id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={() => alert("Delete action")}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Images & Basic Info */}
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div className="aspect-square relative rounded-lg overflow-hidden border bg-gray-50">
                      <Image
                        src={product.images?.[selectedImage]?.url || "/placeholder.svg"}
                        alt={`${product.name} - Image ${selectedImage + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {(product.images || []).map((image: ImageCreate, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-square relative rounded-md overflow-hidden border-2 ${
                            selectedImage === index ? "border-primary" : "border-gray-200"
                          }`}
                          type="button"
                        >
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold">{product.full_name || product.name}</h1>
                      <p className="text-muted-foreground mt-2">{product.description || "-"}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
                      {/* If you have comparePrice in your model, add here */}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Style ID:</span>
                        <p>{product.style_id}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">SKU:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{product.sku || "-"}</span>
                          {product.sku && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard(product.sku!)}
                              aria-label="Copy SKU"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Season:</span>
                        <p>{product.season || "-"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Packaging:</span>
                        <p>{product.packaging || "-"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fabric:</span>
                        <p>{product.fabric || "-"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Care Instructions:</span>
                        <p>{product.care_instructions || "-"}</p>
                      </div>
                    </div>

                    {/* <div className="flex flex-wrap gap-1">
                      {(product. || []).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}
