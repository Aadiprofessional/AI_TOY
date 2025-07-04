import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, Float } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

interface ModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  className?: string;
}

const Model: React.FC<ModelProps & { scrollY?: any }> = ({ 
  modelPath, 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  autoRotate = false,
  scrollY
}) => {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  useFrame((state) => {
    if (ref.current && autoRotate) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene.clone()} />
    </group>
  );
};

interface Model3DProps extends ModelProps {
  enableScrollAnimation?: boolean;
  targetElement?: string;
  animationType?: 'hero' | 'card' | 'detail';
}

export const Model3D: React.FC<Model3DProps> = ({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = true,
  className = "",
  enableScrollAnimation = false,
  targetElement,
  animationType = 'hero'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Animation transforms based on scroll
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, -100, -200, -300]);
  const scale3D = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.8, 0.6, 0.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.9, 0.7, 0.5]);

  useEffect(() => {
    if (enableScrollAnimation && targetElement) {
      const handleScroll = () => {
        const targetEl = document.getElementById(targetElement);
        
        if (targetEl) {
          const targetRect = targetEl.getBoundingClientRect();
          // This can be used for additional animations in the future
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [enableScrollAnimation, targetElement]);

  const getContainerStyles = () => {
    if (animationType === 'card') {
      return "w-48 h-48 mx-auto";
    }
    if (animationType === 'detail') {
      return "w-full h-96";
    }
    return "w-full h-full";
  };

  const getModelScale = () => {
    // Detect model type and apply appropriate base scaling
    const isElephant = modelPath.includes('elephant');
    const isDino = modelPath.includes('dino');
    
    let baseScale = scale;
    if (isElephant) {
      baseScale = scale * 0.8; // Elephant needs smaller scale
    } else if (isDino) {
      baseScale = scale * 8; // Dino needs 10x larger scale
    }

    // Apply animation type modifiers
    if (animationType === 'card') return baseScale * 0.6;
    if (animationType === 'detail') return baseScale * 1.2;
    return baseScale;
  };

  const getModelPosition = (): [number, number, number] => {
    // Detect model type and apply appropriate positioning
    const isElephant = modelPath.includes('elephant');
    const isDino = modelPath.includes('dino');
    
    // Base position from props
    let [x, y, z] = position;
    
    if (isElephant) {
      // Elephant positioning adjustments
      if (animationType === 'hero') {
        return [x, y, z]; // Lower position for hero
      } else if (animationType === 'card') {
        return [x, y, z]; // Lower position for cards
      } else if (animationType === 'detail') {
        return [x, y-2, z]; // Slightly lower for detail view
      }
    } else if (isDino) {
      // Dino positioning adjustments
      if (animationType === 'hero') {
        return [x, y, z]; // Higher position for hero
      } else if (animationType === 'card') {
        return [x, y +1.9, z]; // Lower position for cards
      } else if (animationType === 'detail') {
        return [x, y, z]; // Default position for detail view
      }
    }
    
    // Default position if no specific model type
    return [x, y, z];
  };

  const getModelRotation = (): [number, number, number] => {
    // Detect model type and apply appropriate rotation
    const isElephant = modelPath.includes('elephant');
    const isDino = modelPath.includes('dino');
    
    // Base rotation from props
    let [rx, ry, rz] = rotation;
    
    if (isElephant) {
      // Elephant rotation adjustments
      if (animationType === 'hero') {
        return [rx, ry + 0.2, rz]; // Slight rotation for better view
      } else if (animationType === 'card') {
        return [rx - 0.1, ry, rz]; // Slight tilt for cards
      }
    } else if (isDino) {
      // Dino rotation adjustments
      if (animationType === 'hero') {
        return [rx, ry - 0.3, rz]; // Different rotation for better view
      } else if (animationType === 'card') {
        return [rx, ry + 0.1, rz]; // Slight rotation for cards
      }
    }
    
    // Default rotation
    return [rx, ry, rz];
  };

  return (
    <motion.div
      ref={containerRef}
      className={`${getContainerStyles()} ${className}`}
      style={enableScrollAnimation ? { y, scale: scale3D, opacity } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {animationType === 'hero' ? (
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <PresentationControls
              global
              rotation={[0.13, 0.1, 0]}
              polar={[-0.4, 0.2]}
              azimuth={[-1, 0.75]}
              config={{ mass: 1, tension: 170, friction: 26 }}
              snap={{ mass: 4, tension: 1500, friction: 200 }}
            >
              <Model
                modelPath={modelPath}
                scale={getModelScale()}
                position={getModelPosition()}
                rotation={getModelRotation()}
                autoRotate={autoRotate}
              />
            </PresentationControls>
          </Float>
        ) : (
          <Model
            modelPath={modelPath}
            scale={getModelScale()}
            position={getModelPosition()}
            rotation={getModelRotation()}
            autoRotate={autoRotate}
          />
        )}
      </Canvas>
    </motion.div>
  );
};

// Preload models
useGLTF.preload('/models/stuffed_elephant_develeopment_phase_ii/scene.gltf');
useGLTF.preload('/models/stuffed_dino_toy/scene.gltf'); 