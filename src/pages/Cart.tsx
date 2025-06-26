import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ShoppingBag size={80} className="text-gray-300 dark:text-gray-600 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base">Discover our amazing AI toys and start your collection!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Start Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shopping Cart ({items.length} items)
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-700 dark:to-blue-900 rounded-lg flex items-center justify-center mx-auto sm:mx-0">
                    <span className="text-xl sm:text-2xl">🧸</span>
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{item.product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">${item.product.price} each</p>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Minus size={16} className="text-gray-600 dark:text-gray-300" />
                    </button>
                    <span className="font-semibold text-lg w-8 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Plus size={16} className="text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors mt-2 sm:mt-1 p-2 sm:p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Shipping</span>
                <span className="font-semibold text-green-600 dark:text-green-400 text-sm sm:text-base">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Tax</span>
                <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                <div className="flex justify-between">
                  <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    ${(getTotalPrice() * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 mb-3 text-sm sm:text-base">
              Proceed to Checkout
            </button>
            
            <button
              onClick={clearCart}
              className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 sm:py-3 rounded-lg font-semibold hover:border-red-500 hover:text-red-500 dark:hover:border-red-400 dark:hover:text-red-400 transition-all duration-300 text-sm sm:text-base"
            >
              Clear Cart
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 