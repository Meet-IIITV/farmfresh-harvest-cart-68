
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'farmer'>('customer');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, we'll accept any password but require specific emails
    if (role === 'customer' && email === 'customer@example.com') {
      login(email, password, role);
      toast.success('Logged in successfully as customer');
    } else if (role === 'farmer' && email === 'farmer@example.com') {
      login(email, password, role);
      toast.success('Logged in successfully as farmer');
    } else {
      toast.error('Invalid credentials. Try customer@example.com or farmer@example.com');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-cream to-white flex flex-col justify-center">
      <div className="container max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/b39b8a65-0b1e-4327-bf8b-ea6f7e445296.png" 
              alt="AgriSetu Logo" 
              className="h-16 w-16" 
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <span className="text-farm-green-dark">AgriSetu</span>
          </h1>
          <p className="text-gray-600">Sign in to access fresh produce directly from farmers</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup 
                value={role} 
                onValueChange={(value) => setRole(value as 'customer' | 'farmer')}
                className="flex gap-4"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="customer" id="customer" />
                  <Label htmlFor="customer" className="ml-2">Customer</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="farmer" id="farmer" />
                  <Label htmlFor="farmer" className="ml-2">Farmer</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button type="submit" className="w-full bg-farm-green hover:bg-farm-green-dark">
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-farm-green hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
