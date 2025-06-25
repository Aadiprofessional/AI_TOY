import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Shield } from 'lucide-react';
import { Model3D } from '../components/Model3D';
import { Product, useCart } from '../context/CartContext';

const products: Product[] = [
  {
    id: '1',
    name: 'AI Elephant Buddy',
    price: 149.99,
    image: '/models/stuffed_elephant_develeopment_phase_ii/scene.gltf',
    model: '/models/stuffed_elephant_develeopment_phase_ii/scene.gltf',
    description: 'An intelligent, interactive elephant toy that learns and grows with your child.'
  },
  {
    id: '2',
    name: 'Smart Dino Explorer',
    price: 129.99,
    image: '/models/stuffed_dino_toy/scene.gltf',
    model: '/models/stuffed_dino_toy/scene.gltf',
    description: 'A prehistoric adventure companion with augmented reality features.'
  }
];

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square">
              <Model3D
                modelPath={product.model}
                scale={2}
                position={[0, -0.5, 0]}
                autoRotate={true}
                animationType="detail"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8/5 - 124 reviews)</span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-6">${product.price}</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Product</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <motion.button
              onClick={() => addToCart(product)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart size={24} />
              <span>Add to Cart - ${product.price}</span>
            </motion.button>

            <div className="flex items-center justify-center space-x-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="text-green-600 mx-auto mb-1" size={24} />
                <span className="text-xs text-gray-600">Safe & Secure</span>
              </div>
              <div className="text-center">
                <span className="text-2xl mx-auto mb-1 block">🚚</span>
                <span className="text-xs text-gray-600">Free Shipping</span>
              </div>
              <div className="text-center">
                <span className="text-2xl mx-auto mb-1 block">↩️</span>
                <span className="text-xs text-gray-600">30-Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 