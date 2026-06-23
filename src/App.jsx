import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/signup.jsx";
import LogIn from "./pages/login.jsx";
import Products from "./pages/products.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import AddProductItems from "./pages/addProductItems.jsx";
import AddProductPhotos from "./pages/addProductPhotos.jsx";
import Profile from "./pages/profile.jsx";
import ProductDetail from "./pages/productDetail.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentCancel from "./pages/PaymentCancel";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full min-h-screen bg-gray-100 shadow-2xl border">
        <Routes>
          <Route path="/" element={<Products />} />
          
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LogIn /> : <Navigate to="/" />}
          />
          
          {/* Baki routes */}
          <Route path="/addproductitems" element={<AddProductItems />} />
          <Route path="/addImage" element={<AddProductPhotos />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;