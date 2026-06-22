import React, { useRef } from "react";
import Navbar from "../components/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/useProductStore.js";

export default function PhotosDescription() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const {
    productData,
    errors,
    isCreatingProduct,
    addImages,
    removeImage,
    updateDescription,
    createProduct,
    goToPrevScreen
  } = useProductStore();
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert("Please select valid image files");
      return;
    }
    
    const totalImages = productData.images.length + imageFiles.length;
    if (totalImages > 5) {
      alert("You can upload maximum 5 images");
      return;
    }
    
    addImages(imageFiles);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleRemoveImage = (index) => {
    removeImage(index);
  };
  
  const handleDescriptionChange = (e) => {
    updateDescription(e.target.value);
  };
  
  const handleBack = () => {
    goToPrevScreen();
    navigate(-1);
  };
  
  const handleSubmit = async () => {
    const result = await createProduct();
    
    if (result) {
      
      navigate("/");
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="mt-20 bg-gray-100 flex justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Start Selling
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              List your item and reach thousands of potential buyers
            </p>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white text-sm">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-900">
                Item Details
              </span>
            </div>
            
            <span className="text-gray-400">›</span>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm">
                2
              </div>
              <span className="text-sm font-medium text-gray-900">
                Photos & Description
              </span>
            </div>
          </div>
          
          <div className="border rounded-xl p-4 md:p-6">
            <h2 className="font-medium text-gray-900">Photos & Description</h2>
            <p className="text-sm text-gray-500 mb-4">
              Add images and detailed information
            </p>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images *
                </label>
                
                {productData.images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-3">
                    {productData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-400 text-xs cursor-pointer hover:bg-gray-50 ${
                    errors.images ? "border-red-500" : ""
                  }`}
                >
                  <span className="text-xl">⬆</span>
                  Upload Image
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <p className="text-xs text-gray-500 mt-2">
                  Add up to 5 images. The first image will be the main product photo.
                  {productData.images.length > 0 && ` (${productData.images.length}/5 uploaded)`}
                </p>
                
                {errors.images && (
                  <p className="text-red-500 text-xs mt-1">{errors.images}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  rows={4}
                  value={productData.description}
                  onChange={handleDescriptionChange}
                  placeholder="Describe the features, any flaws, and other important details..."
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Minimum 20 characters
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <p className="font-medium text-gray-700 mb-2">Summary:</p>
                <p><span className="text-gray-500">Title:</span> {productData.title}</p>
                <p><span className="text-gray-500">Price:</span> ${productData.price}</p>
                <p><span className="text-gray-500">Category:</span> {productData.category}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                <button
                  onClick={handleBack}
                  disabled={isCreatingProduct}
                  className="w-full sm:w-auto border px-4 py-2 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
                >
                  Back
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={isCreatingProduct}
                  className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreatingProduct ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Product...
                    </span>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}