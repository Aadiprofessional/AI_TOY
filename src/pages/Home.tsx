import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, Heart, Shield, Star } from 'lucide-react';
import { Model3D } from '../components/Model3D';
import { ProductCard } from '../components/ProductCard';
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
  }
];

export const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll-based animations
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -200]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        
        {/* Main 3D Model */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Model3D
            modelPath="/models/stuffed_elephant_develeopment_phase_ii/scene.gltf"
            scale={2}
            position={[0, -0.5, 0]}
            autoRotate={true}
            enableScrollAnimation={true}
            targetElement="products-section"
            animationType="hero"
            className="w-full h-full"
          />
        </div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          style={{ y: textY }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            AI <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TOY</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Where Innovation Meets Imagination. 
            <br />
            Intelligent toys that grow with your child.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Discover Magic
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
              Watch Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-gray-400" size={32} />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose AI TOY?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered toys combine cutting-edge technology with traditional play patterns 
              to create magical experiences that educate, entertain, and inspire.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="text-blue-600" size={48} />,
                title: "AI-Powered Learning",
                description: "Adaptive learning algorithms that personalize experiences based on your child's interests and development."
              },
              {
                icon: <Heart className="text-red-500" size={48} />,
                title: "Emotional Intelligence",
                description: "Advanced emotional recognition helps toys respond appropriately to your child's feelings and moods."
              },
              {
                icon: <Shield className="text-green-600" size={48} />,
                title: "Safe & Secure",
                description: "Privacy-first design with offline capabilities and parent-controlled data management."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Text Content Section - Where model moves to */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Future of Play is Here
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our AI toys don't just entertain – they evolve. Using advanced machine learning, 
                each toy develops its own personality and adapts to your child's unique play style.
              </p>
              <div className="space-y-4">
                {[
                  "Personalized storytelling that grows with your child",
                  "Voice recognition for natural conversations",
                  "Educational games that adapt to learning pace",
                  "Emotion recognition for empathetic responses"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Star className="text-yellow-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* This is where the model will move to from the hero */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="aspect-square">
                  {/* Placeholder for when model arrives here */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 text-lg">Model Animation Target</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our AI TOY Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our range of intelligent companions, each designed to spark curiosity 
              and foster development through interactive play.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience the Magic?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of families who have already discovered the joy of AI-powered play.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Shop Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 