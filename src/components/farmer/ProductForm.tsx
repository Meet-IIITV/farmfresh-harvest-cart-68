
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['vegetable', 'fruit', 'grain']),
  price: z.coerce.number().positive('Price must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  farmName: z.string().min(2, 'Farm name is required'),
  image: z.string().optional(),
  organic: z.boolean().default(false),
  quantity: z.coerce.number().int().positive('Quantity must be a positive number'),
  inStock: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof formSchema>;

export interface ProductFormProps {
  onSubmit: (product: Product) => void;
  editProduct?: Product | null;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, editProduct, onCancel }) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: editProduct?.name || '',
      description: editProduct?.description || '',
      category: editProduct?.category || 'vegetable',
      price: editProduct?.price || 0,
      unit: editProduct?.unit || 'kg',
      farmName: editProduct?.farmName || '',
      image: editProduct?.image || '',
      organic: editProduct?.organic || false,
      quantity: editProduct?.quantity || 1,
      inStock: editProduct?.inStock ?? true,
    },
  });

  const handleSubmit = (data: ProductFormValues) => {
    // Ensure all required Product fields are present
    const productData: Product = {
      id: editProduct?.id || Date.now().toString(),
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
      unit: data.unit,
      farmName: data.farmName,
      image: data.image || '',
      organic: data.organic,
      quantity: data.quantity,
      inStock: data.inStock,
      farmerId: editProduct?.farmerId || undefined
    };
    
    onSubmit(productData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Fresh Carrots" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="farmName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Name</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., Green Valley Farm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="vegetable">Vegetable</SelectItem>
                    <SelectItem value="fruit">Fruit</SelectItem>
                    <SelectItem value="grain">Grain</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., kg, lb, bundle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" step="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your product" 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-full flex items-center space-x-6">
            <FormField
              control={form.control}
              name="organic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Organic</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>In Stock</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">
            {editProduct ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
