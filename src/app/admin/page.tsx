// src/app/admin/page.tsx
"use client";  // parce qu’on utilise un Client Component
import ProductForm from "../components/ProductForm";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold mb-6">Créer un nouveau produit</h1>
      <ProductForm />
    </main>
  );
}