
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import { Leaf } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'farmer'>('customer');
  const { signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    signup(name, email, password, role);
    toast.success(`Account created successfully as ${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-cream to-white flex flex-col justify-center">
      <div className="container max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Leaf className="h-10 w-10 text-farm-green" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <span className="text-farm-green-dark">FarmFresh</span>
            <span className="text-farm-brown ml-1">Market</span>
          </h1>
          <p className="text-gray-600">Create an account to get started</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            
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
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
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
              Create Account
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-farm-green hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
