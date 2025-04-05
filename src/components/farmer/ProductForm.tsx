import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/data/products';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  category: z.string().min(1, {
    message: 'Please select a category.'
  }),
  price: z.number().positive({
    message: 'Price must be positive.'
  }),
  unit: z.string().min(1, {
    message: 'Unit is required (e.g., kg, lb, piece).'
  }),
  farmName: z.string().min(2, {
    message: 'Farm name must be at least 2 characters.'
  }),
  image: z.string().optional(),
  organic: z.boolean().default(false),
  quantity: z.number().int().positive({
    message: 'Quantity must be a positive integer.'
  }),
  inStock: z.boolean().default(true)
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  onSubmit: (data: Product) => void;
  editProduct?: Product | null;
  onCancel?: () => void;
  initialData?: Partial<Product>;
  isEditing?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  onSubmit, 
  editProduct = null, 
  onCancel, 
  initialData, 
  isEditing = false 
}) => {
  const productToEdit = editProduct || initialData;
  const [imagePreview, setImagePreview] = useState<string | null>(
    productToEdit?.image || null
  );

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: productToEdit?.name || '',
      description: productToEdit?.description || '',
      category: productToEdit?.category || 'vegetable',
      price: productToEdit?.price || 0,
      unit: productToEdit?.unit || 'kg',
      farmName: productToEdit?.farmName || '',
      image: productToEdit?.image || '',
      organic: productToEdit?.organic || false,
      quantity: productToEdit?.quantity || 1,
      inStock: productToEdit?.inStock !== undefined ? productToEdit.inStock : true
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to a server
      // For demo purposes, we'll create a local URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        form.setValue('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data: ProductFormValues) => {
    // Ensure all required Product fields are present
    const productData: Product = {
      id: productToEdit?.id || Date.now().toString(),
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
      farmerId: productToEdit?.farmerId || undefined
    };
    
    onSubmit(productData);
    
    if (!productToEdit) {
      form.reset({
        name: '',
        description: '',
        category: 'vegetable',
        price: 0,
        unit: 'kg',
        farmName: '',
        image: '',
        organic: false,
        quantity: 1,
        inStock: true
      });
      setImagePreview(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{productToEdit ? 'Edit Product' : 'Add New Product'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
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
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="vegetable">Vegetable</option>
                        <option value="fruit">Fruit</option>
                        <option value="grain">Grain</option>
                        <option value="dairy">Dairy</option>
                        <option value="other">Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00" 
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="kg, lb, piece, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity Available</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
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
                      <Input placeholder="Your farm's name" {...field} />
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
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your product" 
                      className="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormLabel htmlFor="image">Product Image</FormLabel>
                <Input 
                  id="image"
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="h-32 w-32 object-cover rounded-md border" 
                    />
                  </div>
                )}
              </div>
              
              <div className="flex flex-col justify-end">
                <FormField
                  control={form.control}
                  name="organic"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Organic Product</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Check if this product is certified organic
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="inStock"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>In Stock</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Uncheck if this product is currently unavailable
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" className="w-full bg-farm-green hover:bg-farm-green-dark">
                {productToEdit ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
