import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Model3D } from './Model3D';
import { Product, useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    
    // Show a quick animation or notification
    const button = e.currentTarget as HTMLButtonElement;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
      onClick={handleCardClick}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image/Model Container */}
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Model3D
            modelPath={product.model}
            scale={0.8}
            position={[0, -2, 0]}
            autoRotate={true}
            animationType="card"
            className="w-full h-full"
          />
        </div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={16} className="sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors" />
        </motion.div>

        {/* Price Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold">
          ${product.price}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 text-yellow-500 dark:text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="sm:w-4 sm:h-4" fill="currentColor" />
            ))}
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {['AI-Powered', 'Voice Recognition', 'Educational'].map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <motion.button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Add to Cart</span>
          </motion.button>
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Details
          </motion.button>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-blue-200 dark:bg-blue-800/30 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-purple-200 dark:bg-purple-800/30 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </motion.div>
  );
}; 