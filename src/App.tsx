
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Farmers from "./pages/Farmers";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Custom routes based on authentication and role
const ProtectedRoute = ({ children, allowedRole }: { children: JSX.Element, allowedRole: 'customer' | 'farmer' }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (user && user.role !== allowedRole) {
    return <Navigate to={user.role === 'farmer' ? '/farmers' : '/'} />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? 
          <Navigate to={user?.role === 'farmer' ? '/farmers' : '/'} /> : 
          <Login />
      } />
      <Route path="/signup" element={
        isAuthenticated ? 
          <Navigate to={user?.role === 'farmer' ? '/farmers' : '/'} /> : 
          <Signup />
      } />
      <Route path="/" element={
        <ProtectedRoute allowedRole="customer">
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/farmers" element={
        <ProtectedRoute allowedRole="farmer">
          <Farmers />
        </ProtectedRoute>
      } />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
