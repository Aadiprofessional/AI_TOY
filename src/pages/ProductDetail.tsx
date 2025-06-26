import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Heart, ShoppingCart, Shield, Zap, Brain, Users } from 'lucide-react';
import { Model3D } from '../components/Model3D';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import type { Product } from '../context/CartContext';

const products: Product[] = [
  {
    id: '1',
    name: 'AI Elephant Buddy',
    price: 149.99,
    image: '/models/stuffed_elephant_develeopment_phase_ii/scene.gltf',
    model: '/models/stuffed_elephant_develeopment_phase_ii/scene.gltf',
    description: 'An intelligent, interactive elephant toy that learns and grows with your child. Features voice recognition, educational games, and emotional bonding capabilities.'
  },
  {
    id: '2',
    name: 'Smart Dino Explorer',
    price: 129.99,
    image: '/models/stuffed_dino_toy/scene.gltf',
    model: '/models/stuffed_dino_toy/scene.gltf',
    description: 'A prehistoric adventure companion with augmented reality features, storytelling abilities, and interactive learning experiences about dinosaurs and science.'
  }
];

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Return to homepage
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const specifications = [
    { label: 'Age Range', value: '3-12 years', icon: <Users size={20} /> },
    { label: 'AI Processing', value: 'Edge Computing', icon: <Brain size={20} /> },
    { label: 'Response Time', value: '< 100ms', icon: <Zap size={20} /> },
    { label: 'Safety Rating', value: 'CPSC Certified', icon: <Shield size={20} /> },
    { label: 'Battery Life', value: '8-12 hours', icon: <Zap size={20} /> },
    { label: 'Connectivity', value: 'Wi-Fi, Bluetooth', icon: <Brain size={20} /> },
  ];

  const features = [
    'Advanced AI personality that develops over time',
    'Natural language processing for conversations',
    'Emotional intelligence and empathy responses',
    'Educational games and activities',
    'Voice recognition for personalized interactions',
    'Parental controls and privacy protection',
    'Regular software updates with new features',
    'Child-safe materials and construction'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 transition-colors duration-300">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Model */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
              <Model3D
                modelPath={product.model}
                scale={0.4}
                position={[0, 0, 0]}
                autoRotate={true}
                animationType="detail"
                className="w-full h-96"
              />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-red-500 text-white p-3 rounded-full shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❤️
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🤖
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">(124 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                ${product.price}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Product Features
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {['AI-Powered', 'Voice Recognition', 'Educational', 'Safe Materials'].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 dark:text-gray-300">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart size={24} />
                </button>
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
                </motion.button>
                
                <button className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-4 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Shield size={20} />, text: 'Safe & Secure' },
                { icon: <Zap size={20} />, text: 'Fast Delivery' },
                { icon: <Heart size={20} />, text: '30-Day Return' },
              ].map((badge, index) => (
                <div key={index} className="flex flex-col items-center text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  <div className="text-blue-600 dark:text-blue-400 mb-1">{badge.icon}</div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-700 mb-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'specifications', label: 'Specifications' },
              { id: 'reviews', label: 'Reviews' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Product Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {product.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Key Features
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Technical Specifications
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-blue-600 dark:text-blue-400">{spec.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{spec.label}</div>
                        <div className="text-gray-600 dark:text-gray-300">{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Customer Reviews
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "Sarah M.",
                      rating: 5,
                      comment: "Amazing toy! My daughter loves talking to it and it actually responds in meaningful ways.",
                      date: "2 weeks ago"
                    },
                    {
                      name: "Mike D.",
                      rating: 5,
                      comment: "The AI is incredibly advanced. It's like having a real companion for my son.",
                      date: "1 month ago"
                    },
                    {
                      name: "Lisa K.",
                      rating: 4,
                      comment: "Great product, though battery life could be better. Overall very impressed!",
                      date: "1 month ago"
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold text-gray-900 dark:text-white">{review.name}</span>
                          <div className="flex items-center space-x-1 text-yellow-500">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 