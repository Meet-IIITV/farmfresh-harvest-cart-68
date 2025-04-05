
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductForm from './ProductForm';
import ProductsList from './ProductsList';
import { Product } from '@/data/products';
import { toast } from 'sonner';

// Demo farmer's ID - in a real app, this would come from authentication
const DEMO_FARMER_ID = 'farmer-123';

const FarmerDashboard = () => {
  const [farmerProducts, setFarmerProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      setFarmerProducts(
        farmerProducts.map((p) => (p.id === product.id ? product : p))
      );
      setEditingProduct(null);
      toast.success('Product updated successfully');
    } else {
      // Add new product with unique ID
      const newProduct = {
        ...product,
        id: `product-${Date.now()}`,
        farmerId: DEMO_FARMER_ID,
        farmName: product.farmName || 'Your Farm', // Default farm name if not provided
      };
      setFarmerProducts([...farmerProducts, newProduct]);
      toast.success('Product added successfully');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = (productId: string) => {
    setFarmerProducts(farmerProducts.filter((product) => product.id !== productId));
    toast.success('Product deleted successfully');
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">{editingProduct ? 'Edit Product' : 'Add Product'}</TabsTrigger>
          <TabsTrigger value="listings">My Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="p-4 md:p-6">
          <ProductForm 
            onSubmit={handleAddProduct} 
            editProduct={editingProduct}
            onCancel={cancelEdit}
          />
        </TabsContent>
        
        <TabsContent value="listings" className="p-4 md:p-6">
          <ProductsList 
            products={farmerProducts} 
            onEdit={handleEditProduct} 
            onDelete={handleDeleteProduct} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerDashboard;
