"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SidebarTrigger } from "@/app/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs"

import { ArrowLeft, Package, Eye, Edit, Trash2, Copy, TrendingUp, Star, ExternalLink ,  AlertTriangle} from "lucide-react"
import { ProductsService } from "@/app/services/generated"
import type { ProductOut } from "@/app/services/generated/models/ProductOut"
import type { ImageOut } from "@/app/services/generated/models/ImageOut"
import type { VariantOut } from "@/app/services/generated/models/VariantOut"
import { ProductVariantsTab } from "@/app/components/admin/ProductVariantsTab"
export default function ProductViewPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<ProductOut | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const fetchProduct = async () => {
    if (typeof id !== "string") return
    try {
      const data = await ProductsService.getProductEndpointProductsProductIdGet(id)
      setProduct(data)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch product")
    }
  }

  useEffect(() => {
    setProduct(null)
    setError(null)
    setSelectedVariantIndex(0)
    setSelectedImageIndex(0)
    fetchProduct()
  }, [id])

  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!product) return <div className="p-6">Loading product...</div>

const variants = product.variants || [];
const selectedVariant: VariantOut | undefined = variants[selectedVariantIndex];
const images: ImageOut[] = selectedVariant?.images || [];



  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Delete product handler
  const handleDelete = async () => {
    if (!id) return
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      await ProductsService.deleteProductProductsProductIdDelete(id)
      router.push("/admin/products")
    } catch {
      alert("Failed to delete product")
    }
  }

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
          <Button variant="destructive" size="sm" onClick={handleDelete}>
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
          

            {/* --- ADDING TABS SECTION --- */}
            <Tabs defaultValue="variants" className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
    <TabsTrigger value="product">Product</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>
 <TabsContent value="product" className="space-y-6">
    <Card>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden border bg-gray-50">
              <Image
                src={images[selectedImageIndex]?.url || "/placeholder.svg"}
                alt={images[selectedImageIndex]?.alt_text ?? `${product.name} - Image ${selectedImageIndex + 1}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square relative rounded-md overflow-hidden border-2 ${
                    selectedImageIndex === index ? "border-primary" : "border-gray-200"
                  }`}
                  type="button"
                >
                  <Image
                    src={image.url}
                    alt={image.alt_text ?? `Thumbnail ${index + 1}`}
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
            </div>

            {/* Variant Selector */}
            {variants.length > 1 && (
              <div className="flex gap-2 items-center text-sm">
                <span className="text-muted-foreground">Color:</span>
                {variants.map((variant, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`px-3 py-1 rounded border ${
                      selectedVariantIndex === idx
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedVariantIndex(idx)
                      setSelectedImageIndex(0)
                    }}
                  >
                    {variant.color}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
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
          </div>
        </div>
      </CardContent>
    </Card>
  </TabsContent>
<TabsContent value="variants">
  <ProductVariantsTab productId={id as string} />
</TabsContent>



           <TabsContent value="analytics" className="space-y-4">
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
        <Eye className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">-</div>
        <p className="text-xs text-muted-foreground">
          <span className="text-green-600">+12%</span> from last month
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">-</div>
        <p className="text-xs text-muted-foreground">
          <span className="text-green-600">+8%</span> from last month
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$-</div>
        <p className="text-xs text-muted-foreground">
          <span className="text-green-600">+15%</span> from last month
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">-%</div>
        <p className="text-xs text-muted-foreground">
          <span className="text-green-600">+0.3%</span> from last month
        </p>
      </CardContent>
    </Card>
  </div>
</TabsContent>

<TabsContent value="reviews" className="space-y-4">
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        Reviews
        <Badge variant="secondary">-</Badge>
        <div className="flex items-center gap-1 ml-auto">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">-</span>
        </div>
      </CardTitle>
      <CardDescription>Customer feedback and ratings</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      {/* No reviews */}
      <p className="text-sm text-muted-foreground">No reviews available.</p>
    </CardContent>
  </Card>
</TabsContent>

<TabsContent value="inventory" className="space-y-4">
  <div className="grid gap-4 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Stock Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Stock</span>
          <span className="font-medium">- units</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Low Stock Threshold</span>
          <span className="font-medium">- units</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Reorder Point</span>
          <span className="font-medium">- units</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Supplier</span>
          <span className="font-medium">-</span>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Restock Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Restock Date</span>
          <span className="font-medium">-</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Next Restock Date</span>
          <span className="font-medium">-</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Restock Quantity</span>
          <span className="font-medium">-</span>
        </div>
      </CardContent>
    </Card>
  </div>
</TabsContent>

<TabsContent value="seo" className="space-y-4">
  <Card>
    <CardHeader>
      <CardTitle>SEO Details</CardTitle>
      <CardDescription>Metadata and indexing info</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div>
          <span className="text-muted-foreground">Meta Title:</span>
          <p>-</p>
        </div>
        <div>
          <span className="text-muted-foreground">Meta Description:</span>
          <p>-</p>
        </div>
        <div>
          <span className="text-muted-foreground">Canonical URL:</span>
          <Link href="#" target="_blank" className="text-primary underline flex items-center gap-1">
            -
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
</TabsContent>

            </Tabs>

          </div>
          <div className="space-y-6">
  {/* Quick Stats */}
  <Card>
    <CardHeader>
      <CardTitle>Quick Stats</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Profit Margin</span>
        <span className="font-medium text-green-600">{/* Replace with your data */}%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Return Rate</span>
        <span className="font-medium">
          {/* {product.analytics.returnRate}% */}
          -
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Avg Rating</span>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">
            {/* {product.analytics.avgRating} */}
            -
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Featured</span>
        <Badge variant={"secondary"}>
          {/* {product.featured ? "Yes" : "No"} */}
          No
        </Badge>
      </div>
    </CardContent>
  </Card>

  {/* Stock Alerts */}
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        Stock Alerts
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {/* {product.variants
        .filter((variant) => variant.stock <= 10)
        .map((variant) => (
          <div key={variant.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
            <div className="text-sm">
              <p className="font-medium">
                {variant.size} - {variant.color}
              </p>
              <p className="text-muted-foreground">{variant.stock} units left</p>
            </div>
            <Badge variant="destructive">Low Stock</Badge>
          </div>
        ))} */}
      <p className="text-muted-foreground text-sm italic">No stock alerts to show</p>
    </CardContent>
  </Card>

  {/* Quick Actions */}
  <Card>
    <CardHeader>
      <CardTitle>Quick Actions</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <Button variant="outline" className="w-full justify-start bg-transparent">
        <Package className="h-4 w-4 mr-2" />
        Duplicate Product
      </Button>
      <Button variant="outline" className="w-full justify-start bg-transparent">
        <TrendingUp className="h-4 w-4 mr-2" />
        View Analytics
      </Button>
      <Button variant="outline" className="w-full justify-start bg-transparent">
        <ExternalLink className="h-4 w-4 mr-2" />
        View on Store
      </Button>
    </CardContent>
  </Card>

  {/* Timestamps */}
  <Card>
    <CardHeader>
      <CardTitle>Product History</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Created</span>
        <span>{/* {product.createdAt} */}-</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Last Updated</span>
        <span>{/* {product.updatedAt} */}-</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Cost Price</span>
        <span>$ {/* {product.costPrice} */}-</span>
      </div>
    </CardContent>
  </Card>
</div>

        </div>
      </main>
    </div>
  )
}
