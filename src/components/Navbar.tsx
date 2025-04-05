
import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const { toggleCart, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2">
            <Menu className="h-6 w-6" />
          </Button>
          <a href="/" className="flex items-center">
            <span className="text-farm-green-dark text-xl font-bold">FarmFresh</span>
            <span className="text-farm-brown ml-1 text-xl font-bold">Market</span>
          </a>
        </div>

        <nav className="hidden md:flex space-x-6 ml-10">
          <a href="/" className="text-farm-green hover:text-farm-green-dark font-medium transition-colors">
            Home
          </a>
          <a href="#marketplace" className="text-gray-600 hover:text-farm-green-dark font-medium transition-colors">
            Market
          </a>
          <a href="#" className="text-gray-600 hover:text-farm-green-dark font-medium transition-colors">
            Farmers
          </a>
          <a href="#" className="text-gray-600 hover:text-farm-green-dark font-medium transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={toggleCart} 
            className="relative" 
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-farm-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
