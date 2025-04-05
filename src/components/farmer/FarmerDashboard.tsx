
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductForm from './ProductForm';
import ProductsList from './ProductsList';
import SoilAnalysisForm from './SoilAnalysisForm';
import CropRecommendations from './CropRecommendations';
import { Product, SoilData } from '@/data/products';
import { toast } from 'sonner';

// Demo farmer's ID - in a real app, this would come from authentication
const DEMO_FARMER_ID = 'farmer-123';

const FarmerDashboard = () => {
  const [farmerProducts, setFarmerProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [activeTab, setActiveTab] = useState('add');

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
    setActiveTab('add');
  };

  const handleDeleteProduct = (productId: string) => {
    setFarmerProducts(farmerProducts.filter((product) => product.id !== productId));
    toast.success('Product deleted successfully');
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  const handleSoilDataSubmit = (data: SoilData) => {
    setSoilData(data);
    toast.success('Soil data analyzed successfully');
    // Switch to the results tab
    setActiveTab('results');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="add">{editingProduct ? 'Edit Product' : 'Add Product'}</TabsTrigger>
          <TabsTrigger value="listings">My Products</TabsTrigger>
          <TabsTrigger value="soil">Soil & Crop Analysis</TabsTrigger>
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

        <TabsContent value="soil" className="p-4 md:p-6">
          {!soilData && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Soil Quality Analysis</h2>
                <p className="text-gray-600">
                  Upload your soil test results to get personalized crop recommendations, 
                  weather condition insights, and fertilizer suggestions.
                </p>
              </div>
              <SoilAnalysisForm 
                onSubmit={handleSoilDataSubmit}
                farmerId={DEMO_FARMER_ID}
              />
            </>
          )}
          
          {soilData && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Soil Analysis Results</h2>
                  <p className="text-gray-600">
                    Based on your soil data, here are our crop recommendations
                  </p>
                </div>
                <button 
                  onClick={() => setSoilData(null)} 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Analyze New Soil Sample
                </button>
              </div>
              <CropRecommendations soilData={soilData} />
            </>
          )}
        </TabsContent>

        <TabsContent value="results" className="p-4 md:p-6">
          {soilData ? (
            <CropRecommendations soilData={soilData} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">No soil analysis results yet</h3>
              <p className="text-gray-500 mt-2">Submit soil data in the Soil Analysis tab to see recommendations</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerDashboard;
