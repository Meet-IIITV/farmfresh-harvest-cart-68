
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { SoilData } from '@/data/products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  farmName: z.string().min(2, 'Farm name is required'),
  soilType: z.string().min(1, 'Soil type is required'),
  ph: z.coerce.number().min(0).max(14, 'pH must be between 0 and 14'),
  nitrogen: z.coerce.number().min(0, 'Nitrogen level must be positive'),
  phosphorus: z.coerce.number().min(0, 'Phosphorus level must be positive'),
  potassium: z.coerce.number().min(0, 'Potassium level must be positive'),
  moisture: z.coerce.number().min(0).max(100, 'Moisture must be between 0 and 100%'),
  organicMatter: z.coerce.number().min(0).max(100, 'Organic matter must be between 0 and 100%'),
  location: z.string().min(2, 'Location is required'),
});

type SoilFormValues = z.infer<typeof formSchema>;

interface SoilAnalysisFormProps {
  onSubmit: (soilData: SoilData) => void;
  farmerId: string;
}

const SoilAnalysisForm: React.FC<SoilAnalysisFormProps> = ({ onSubmit, farmerId }) => {
  const form = useForm<SoilFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmName: '',
      soilType: 'loam',
      ph: 7,
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      moisture: 0,
      organicMatter: 0,
      location: '',
    },
  });

  const handleSubmit = (data: SoilFormValues) => {
    const soilData: SoilData = {
      id: Date.now().toString(),
      farmerId,
      farmName: data.farmName,
      soilType: data.soilType,
      ph: data.ph,
      nitrogen: data.nitrogen,
      phosphorus: data.phosphorus,
      potassium: data.potassium,
      moisture: data.moisture,
      organicMatter: data.organicMatter,
      location: data.location,
      date: new Date().toISOString(),
    };
    
    onSubmit(soilData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., North Field" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="soilType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soil Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="loam">Loam</SelectItem>
                    <SelectItem value="silt">Silt</SelectItem>
                    <SelectItem value="peat">Peat</SelectItem>
                    <SelectItem value="chalk">Chalk</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ph"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soil pH (0-14)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="14" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nitrogen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nitrogen (N) Level (mg/kg)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phosphorus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phosphorus (P) Level (mg/kg)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="potassium"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potassium (K) Level (mg/kg)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="moisture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Moisture Content (%)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="100" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organicMatter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organic Matter (%)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="100" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="submit">
            Analyze Soil & Get Recommendations
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SoilAnalysisForm;
