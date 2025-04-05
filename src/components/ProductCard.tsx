
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className="product-card overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {product.organic && (
          <Badge className="absolute top-2 right-2 bg-farm-green text-white">
            Organic
          </Badge>
        )}
      </div>
      <CardContent className="flex-grow pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <span className="font-bold text-farm-green">
            {formatPrice(product.price)}
            <span className="text-sm font-normal text-gray-500 ml-1">
              /{product.unit}
            </span>
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-2">{product.description}</p>
        <p className="text-xs text-gray-400">From {product.farmName}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-farm-green hover:bg-farm-green-dark"
          onClick={handleAddToCart}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
