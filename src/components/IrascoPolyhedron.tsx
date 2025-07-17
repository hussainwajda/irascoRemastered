import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Octahedron, Text, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

const PolyhedronCore = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Product icons (simplified for this phase)
  const productFaces = [
    "CHILLER", "HEAT-PUMP", "VRF", "DUCTING", 
    "VENTILATION", "CONTROLS", "FILTERS", "SENSORS"
  ];

  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.003;
      
      // Mouse influence
      const mouseInfluence = 0.1;
      meshRef.current.rotation.y += mousePosition.x * mouseInfluence;
      meshRef.current.rotation.x += mousePosition.y * mouseInfluence;
      
      // Hover effect
      if (hovered) {
        meshRef.current.rotation.y += 0.02;
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 3) * 0.05);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Octahedron
        ref={meshRef}
        args={[2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhysicalMaterial
          color="#29F0C6"
          metalness={0.9}
          roughness={0.1}
          transmission={0.8}
          thickness={0.5}
          ior={1.5}
          emissive="#29F0C6"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Octahedron>
      
      {/* Floating text labels for product faces */}
      {productFaces.slice(0, 4).map((product, index) => (
        <Text
          key={product}
          position={[
            Math.cos((index / 4) * Math.PI * 2) * 3,
            Math.sin((index / 4) * Math.PI * 2) * 1.5,
            Math.sin((index / 4) * Math.PI * 2) * 2
          ]}
          fontSize={0.3}
          color="#E7F7FF"
          anchorX="center"
          anchorY="middle"
          font="/fonts/exo-2-bold.woff"
        >
          {product}
        </Text>
      ))}
    </Float>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 1000;
  
  // Create particle positions
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;     // x
    positions[i + 1] = (Math.random() - 0.5) * 20; // y
    positions[i + 2] = (Math.random() - 0.5) * 20; // z
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      // Gentle floating motion
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#29F0C6"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const IrascoPolyhedron = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className="w-full h-full relative cursor-none"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.2, ease: "easeOut" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#29F0C6" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7B61FF" />
        
        <ParticleField />
        <PolyhedronCore mousePosition={mousePosition} />
      </Canvas>

      {/* Airflow SVG overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: mousePosition.x !== 0 || mousePosition.y !== 0 ? 1 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-full h-full" viewBox="0 0 800 600">
          <defs>
            <radialGradient id="airflow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#29F0C6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#29F0C6" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Dynamic airflow lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.circle
              key={i}
              cx="400"
              cy="300"
              r={50 + i * 30}
              fill="none"
              stroke="url(#airflow)"
              strokeWidth="2"
              strokeDasharray="10,10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, 0.6, 0],
                r: [50 + i * 30, 50 + i * 30 + 100]
              }}
              transition={{ 
                duration: 3, 
                delay: i * 0.2, 
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
};