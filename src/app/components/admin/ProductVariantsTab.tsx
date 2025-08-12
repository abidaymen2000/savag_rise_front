// ProductVariantsTab.tsx
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { VariantsService } from "@/app/services/generated"
import type { VariantOut } from "@/app/services/generated"

interface ProductVariantsTabProps {
  productId: string
}

export function ProductVariantsTab({ productId }: ProductVariantsTabProps) {
  const [variants, setVariants] = useState<VariantOut[]>([])

  const fetchVariants = async () => {
    try {
      const res = await VariantsService.listVariantsProductsProductIdVariantsGet(productId)
      setVariants(res)
    } catch (err) {
      console.error("Failed to fetch variants", err)
    }
  }

  useEffect(() => {
    fetchVariants()
  }, [productId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variants</CardTitle>
        <CardDescription>Display product variants (color, sizes, and stocks)</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Color</TableHead>
              <TableHead>Sizes</TableHead>
              <TableHead>Stocks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant) => (
              <TableRow key={variant.color}>
                <TableCell>{variant.color}</TableCell>
                <TableCell>
                  {variant.sizes.map((s) => (
                    <div key={s.size}>{s.size}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {variant.sizes.map((s) => (
                    <div key={s.size}>{s.stock}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
