import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/detail/${product._id}`)} className="border rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="relative">
        <img
          src={product.images?.[0]?.url || "/placeholder.png"}
          alt={product.title || "product"}
          className="w-full h-40 object-cover rounded-lg"
        />
        <span className="absolute top-2 right-2 bg-black text-white text-xs px-3 py-1 rounded-full">
          {product.category || "Category"}
        </span>
      </div>
      <h2 className="mt-3 font-semibold text-lg">{product.title}</h2>

      <p className="text-gray-500 text-xs mt-1">Current Price</p>
      <p className="font-bold text-lg">${product.price}</p>


    </div>
  );
};

export default ProductCard;
