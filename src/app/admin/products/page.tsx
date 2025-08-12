"use client"

import { useEffect, useState } from "react"
import { SidebarTrigger } from "@/app/components/ui/sidebar"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Input } from "@/app/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Package } from "lucide-react"
import Link from "next/link"

import { ProductsService } from "@/app/services/generated"
import type { ProductOut } from "@/app/services/generated/models/ProductOut"

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<ProductOut[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductOut[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await ProductsService.listProductsProductsGet()
        setAllProducts(res)
        setFilteredProducts(res)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const term = searchTerm.toLowerCase()
    setFilteredProducts(
      allProducts.filter((p) =>
        p.name?.toLowerCase().includes(term) ||
        p.full_name?.toLowerCase().includes(term) ||
        p.sku?.toLowerCase().includes(term) ||
        p.style_id?.toLowerCase().includes(term)
      )
    )
  }, [searchTerm, allProducts])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center gap-2">
          <Package className="h-5 w-5" />
          <h1 className="text-lg font-semibold">Products</h1>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </header>

      <main className="flex-1 space-y-4 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Manage your clothing items and collections</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search + Filter row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" disabled>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Products Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Style ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Season</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock Status</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const firstImage = product.variants?.[0]?.images?.[0]?.url || null
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          {firstImage ? (
                            <img
                              src={firstImage}
                              alt={product.name}
                              className="rounded-md object-cover"
                              width={60}
                              height={60}
                            />
                          ) : (
                            <img
                              src="/placeholder.svg"
                              alt="No image"
                              width={60}
                              height={60}
                              className="rounded-md object-cover"
                            />
                          )}
                        </TableCell>
                        <TableCell>{product.style_id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.full_name}</TableCell>
                        <TableCell>{product.sku ?? "-"}</TableCell>
                        <TableCell className="max-w-xs truncate">{product.description ?? "-"}</TableCell>
                        <TableCell>{product.season ?? "-"}</TableCell>
                        <TableCell className="font-medium">
                          {product.price != null ? `$${product.price.toFixed(2)}` : "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.in_stock ? "default" : "destructive"}>
                            {product.in_stock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/products/${product.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
