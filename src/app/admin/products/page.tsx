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
// import Image from "next/image"
import Link from "next/link"

import { ProductsService } from "@/app/services/generated"
import type { ProductOut } from "@/app/services/generated/models/ProductOut"

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductOut[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ProductsService.listProductsProductsGet()
      .then((res) => {
        console.log("Fetched products:", res)  // <-- Here is the console.log
        setProducts(res)
      })
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false))
  }, [])

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
        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Manage your clothing items and collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-10" disabled />
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
                  {products.map((product) => (
                  <TableRow key={product.id}>
<TableCell>
    {product.images && product.images.length > 0 ? (
      <img
        src={product.images[0].url}
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
                      <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
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
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
