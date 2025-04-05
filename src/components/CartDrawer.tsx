
import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import CartItem from './CartItem';
import { useCart } from '@/context/CartContext';

const CartDrawer: React.FC = () => {
  const { state, toggleCart, clearCart, totalPrice, totalItems } = useCart();
  const { items, isOpen } = state;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-2 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">Your Cart</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggleCart}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-xl font-medium text-gray-500">Your cart is empty</p>
            <p className="text-gray-400 mt-2">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button
              className="mt-6 bg-farm-green hover:bg-farm-green-dark"
              onClick={toggleCart}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="py-2">
                    <CartItem item={item} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <Button
                  variant="outline"
                  className="w-full mb-4"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>

              <div className="border-t border-gray-200 py-4 space-y-2">
                <div className="flex justify-between text-base text-gray-500">
                  <p>Subtotal ({totalItems} items)</p>
                  <p>{formatPrice(totalPrice)}</p>
                </div>
                <div className="flex justify-between text-base text-gray-500">
                  <p>Shipping</p>
                  <p>Calculated at checkout</p>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-medium">
                  <p>Total</p>
                  <p>{formatPrice(totalPrice)}</p>
                </div>
              </div>

              <SheetFooter className="mt-6">
                <Button className="w-full bg-farm-green hover:bg-farm-green-dark">
                  Checkout
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
