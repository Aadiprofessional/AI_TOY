import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, Heart, Shield, Star, Brain, Zap, Users } from 'lucide-react';
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

  // Scroll-based animations for different sections
  const heroY = useTransform(scrollYProgress, [0, 0], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -200]);
  
  // Model movement animations
  const modelX = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 200, -200, 0]);
  const modelY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, -150, -300, -450]);
  const modelScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.8, 0.6, 0.4]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1, 1],

                opacity: [0, 0, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Main 3D Model with Complex Animation */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ x: modelX, y: modelY, scale: modelScale }}
        >
          <Model3D
            modelPath="/models/stuffed_elephant_develeopment_phase_ii/scene.gltf"
            scale={0.5}
            position={[0, -2, 0]}
            autoRotate={true}
            enableScrollAnimation={true}
            targetElement="learning-section"
            animationType="hero"
            className="w-full h-full"
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ y: textY }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            AI <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TOY</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Where Innovation Meets Imagination. 
            <br />
            Intelligent toys that grow with your child.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Discover Magic
            </button>
            <button className="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300">
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
          <ArrowDown className="text-gray-400 dark:text-gray-600" size={32} />
        </motion.div>
      </motion.section>

      {/* Intelligence Showcase Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Your Child's New <span className="text-blue-600 dark:text-blue-400">AI Companion</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Our AI toys don't just play—they learn, adapt, and grow with your child. 
                Watch as they develop unique personalities and form lasting bonds.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
                {[
                  { icon: <Brain className="text-purple-600" size={24} />, label: "AI Learning", value: "Advanced" },
                  { icon: <Heart className="text-red-500" size={24} />, label: "Emotional Bond", value: "Deep" },
                  { icon: <Zap className="text-yellow-500" size={24} />, label: "Response Time", value: "Instant" },
                  { icon: <Users className="text-green-500" size={24} />, label: "Age Range", value: "3-12 years" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Moving Model Target Area */}
            <motion.div
              id="learning-section"
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="aspect-square flex items-center justify-center">
                  <Model3D
                    modelPath="/models/stuffed_dino_toy/scene.gltf"
                    scale={0.4}
                    position={[0, -0, 0]}
                    autoRotate={true}
                    animationType="detail"
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              {/* Floating AI Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-blue-500 text-white p-2 sm:p-3 rounded-full shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 360, 0] 
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🧠
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-2 sm:p-3 rounded-full shadow-lg"
                animate={{ 
                  y: [0, -8, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                💭
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose AI TOY?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              Our AI-powered toys combine cutting-edge technology with traditional play patterns 
              to create magical experiences that educate, entertain, and inspire.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Sparkles className="text-blue-600" size={48} />,
                title: "AI-Powered Learning",
                description: "Adaptive learning algorithms that personalize experiences based on your child's interests and development.",
                model: "/models/stuffed_elephant_develeopment_phase_ii/scene.gltf"
              },
              {
                icon: <Heart className="text-red-500" size={48} />,
                title: "Emotional Intelligence",
                description: "Advanced emotional recognition helps toys respond appropriately to your child's feelings and moods.",
                model: "/models/stuffed_dino_toy/scene.gltf"
              },
              {
                icon: <Shield className="text-green-600" size={48} />,
                title: "Safe & Secure",
                description: "Privacy-first design with offline capabilities and parent-controlled data management.",
                model: "/models/stuffed_elephant_develeopment_phase_ii/scene.gltf"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative text-center p-4 sm:p-6 lg:p-8 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* Mini 3D Model */}
                <div className="absolute top-3 right-3 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                  <Model3D
                    modelPath={feature.model}
                    scale={0.8}
                    position={[0, -2, 0]}
                    autoRotate={true}
                    animationType="card"
                    className="w-full h-full"
                  />
                </div>
                
                <div className="mb-4 sm:mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demonstration Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              See AI TOY in Action
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Voice Interaction",
                description: "Natural conversations with advanced speech recognition",
                model: "/models/stuffed_elephant_develeopment_phase_ii/scene.gltf",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Learning Games",
                description: "Educational activities that adapt to your child's level",
                model: "/models/stuffed_dino_toy/scene.gltf",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Emotional Support",
                description: "Empathetic responses and comfort when needed",
                model: "/models/stuffed_elephant_develeopment_phase_ii/scene.gltf",
                color: "from-green-500 to-emerald-500"
              }
            ].map((demo, index) => (
              <motion.div
                key={index}
                className="relative bg-gray-50 dark:bg-gray-700 rounded-3xl p-3 sm:p-4 lg:p-6 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`h-32 sm:h-40 lg:h-48 bg-gradient-to-br ${demo.color} rounded-2xl mb-3 sm:mb-4 lg:mb-6 relative overflow-hidden`}>
                  <Model3D
                    modelPath={demo.model}
                    scale={0.8}
                    position={[0, -2, 0]}
                    autoRotate={true}
                    animationType="card"
                    className="w-full h-full"
                  />
                  
                  {/* Animated Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {demo.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base">
                  {demo.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our AI TOY Collection
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              Discover our range of intelligent companions, each designed to spark curiosity 
              and foster development through interactive play.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 transition-colors duration-300">
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