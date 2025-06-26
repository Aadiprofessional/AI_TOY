import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Grid, List } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Model3D } from '../components/Model3D';
import { Product } from '../context/CartContext';

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
  },
  {
    id: '3',
    name: 'AI Elephant Pro',
    price: 199.99,
    image: '/models/stuffed_elephant_develeopment_phase_ii/scene.gltf',
    model: '/models/stuffed_elephant_develeopment_phase_ii/scene.gltf',
    description: 'Advanced AI elephant with enhanced learning capabilities, multilingual support, and premium interactive features for extended playtime.'
  },
  {
    id: '4',
    name: 'Dino Adventure Pack',
    price: 159.99,
    image: '/models/stuffed_dino_toy/scene.gltf',
    model: '/models/stuffed_dino_toy/scene.gltf',
    description: 'Complete dinosaur adventure set with multiple interaction modes, fossil discovery games, and prehistoric storytelling adventures.'
  }
];

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-r from-blue-400/5 to-purple-400/5 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Products</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Discover our complete collection of AI-powered toys designed to inspire, 
                educate, and grow with your child's imagination.
              </p>
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{products.length}</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">100%</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">AI-Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">Safe</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Certified</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <Model3D
                  modelPath="/models/stuffed_elephant_develeopment_phase_ii/scene.gltf"
                  scale={0.5}
                  position={[0, -0, 0]}
                  autoRotate={true}
                  animationType="detail"
                  className="w-full h-64 sm:h-96"
                />
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-blue-500 text-white p-2 sm:p-3 rounded-full shadow-lg"
                animate={{ y: [0, -10, 0], rotate: [0, 360, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🎯
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-2 sm:p-3 rounded-full shadow-lg"
                animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                ✨
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filters and View Toggle */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-gray-600 dark:text-gray-400">
            Showing {sortedProducts.length} of {products.length} products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedProducts.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search terms or filters
              </p>
            </motion.div>
          ) : (
            <div className={`grid gap-6 sm:gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`w-full ${viewMode === 'list' ? 'transform scale-110' : ''}`}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Our Products?
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: '🤖',
                title: 'Advanced AI',
                description: 'Each toy features cutting-edge artificial intelligence that creates unique, personalized experiences.'
              },
              {
                icon: '🔒',
                title: 'Privacy First',
                description: 'Your child\'s data is protected with industry-leading security and privacy measures.'
              },
              {
                icon: '🎓',
                title: 'Educational Value',
                description: 'Designed by child development experts to promote learning through interactive play.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-4 sm:p-6 lg:p-8 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}; 