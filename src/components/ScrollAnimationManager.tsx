import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Model3D } from './Model3D';

interface ScrollAnimationManagerProps {
  children: React.ReactNode;
}

export const ScrollAnimationManager: React.FC<ScrollAnimationManagerProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<'hero' | 'text' | 'products'>('hero');
  const [modelPosition, setModelPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Transform values for different scroll positions
  const heroModelY = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
  const heroModelScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);
  const heroModelOpacity = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 0.8, 0]);

  const textModelY = useTransform(scrollYProgress, [0.25, 0.4, 0.7], [-100, 0, -100]);
  const textModelScale = useTransform(scrollYProgress, [0.25, 0.4, 0.7], [0.5, 1, 0.8]);
  const textModelOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.65, 0.7], [0, 1, 1, 0]);

  const productsModelY = useTransform(scrollYProgress, [0.65, 0.8], [-50, 0]);
  const productsModelScale = useTransform(scrollYProgress, [0.65, 0.8], [0.6, 1]);
  const productsModelOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest < 0.25) {
        setCurrentSection('hero');
      } else if (latest < 0.65) {
        setCurrentSection('text');
      } else {
        setCurrentSection('products');
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed Model Overlay - This follows the scroll */}
      <div className="fixed inset-0 pointer-events-none z-30">
        <AnimatePresence mode="wait">
          {currentSection === 'hero' && (
            <motion.div
              key="hero-model"
              className="absolute inset-0 flex items-center justify-center"
              style={{ 
                y: heroModelY, 
                scale: heroModelScale, 
                opacity: heroModelOpacity 
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-96 h-96">
                <Model3D
                  modelPath="/models/stuffed_elephant_develeopment_phase_ii/scene.gltf"
                  scale={2.5}
                  position={[0, -0.5, 0]}
                  autoRotate={true}
                  animationType="hero"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          )}
          
          {currentSection === 'text' && (
            <motion.div
              key="text-model"
              className="absolute right-1/4 top-1/2 transform -translate-y-1/2"
              style={{ 
                y: textModelY, 
                scale: textModelScale, 
                opacity: textModelOpacity 
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-80 h-80">
                <Model3D
                  modelPath="/models/stuffed_elephant_develeopment_phase_ii/scene.gltf"
                  scale={1.8}
                  position={[0, -0.3, 0]}
                  autoRotate={true}
                  animationType="card"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          )}
          
          {currentSection === 'products' && (
            <motion.div
              key="products-model"
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                y: productsModelY, 
                scale: productsModelScale, 
                opacity: productsModelOpacity 
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-64 h-64">
                <Model3D
                  modelPath="/models/stuffed_dino_toy/scene.gltf"
                  scale={1.5}
                  position={[0, -0.2, 0]}
                  autoRotate={true}
                  animationType="card"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Floating UI Elements */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </motion.div>

      {/* Particle Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}; 