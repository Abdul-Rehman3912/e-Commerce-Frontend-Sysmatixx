import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../libs/axios.js';
import Navbar from '../components/navbar.jsx';
import { useAuthStore } from '../store/useAuthStore.js';

const ProductDetail = () => {
  const { id } = useParams();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/product/getProduct/${id}`);
      if (response.data.success) {
        setProductData(response.data.data);
      } else {
        setError("Product not found");
      }
    } catch (error) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProductDetails();
  }, [id]);

  const handleBuyNow = async () => {
    if (!productData) return;
    
    if (!authUser) {
      navigate('/login');
      return;
    }
    
    setPaymentLoading(true);
    setError("");
    
    try {
      const orderData = {
        products: [{
          _id: productData._id,
          title: productData.title,
          price: productData.price,
          quantity: quantity,
          image: productData.images?.[0]?.url || 'https://via.placeholder.com/400'
        }],
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        userId: authUser._id
      };

      const response = await axiosInstance.post('/payment/create-checkout-session', orderData);
      
      if (response.data.success && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
      setError("Failed to initiate payment. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-14 bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );

  if (!productData) return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-14 bg-gray-50 flex justify-center items-center">
        <p className="text-red-600">Product not found</p>
      </div>
    </div>
  );

  const price = productData.price || 0;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-14 bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 bg-white p-8 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src={productData.images?.[activeImage]?.url || "https://via.placeholder.com/400"} 
              alt={productData.title} 
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{productData.title}</h1>
            <p className="text-gray-600">{productData.description}</p>
            <h2 className="text-3xl font-extrabold">${price}</h2>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                className="px-3 py-1 bg-gray-200 rounded"
              >-</button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)} 
                className="px-3 py-1 bg-gray-200 rounded"
              >+</button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleBuyNow}
              disabled={paymentLoading}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {paymentLoading ? "Redirecting to Stripe..." : `Buy Now - $${(price * quantity).toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;