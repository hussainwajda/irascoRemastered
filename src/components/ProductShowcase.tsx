import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Zap, Wind, Thermometer, Settings, Filter, Eye } from "lucide-react";

const productData = [
  {
    id: "ceiling-unit",
    title: "Ceiling-Mounted Units",
    description: "Advanced ceiling systems with precision airflow control",
    image: "/lovable-uploads/ec2f0ad9-2b50-419e-9113-bb67d1aa2a8f.png",
    icon: Wind,
    efficiency: "COP 4.2",
    capacity: "12-48 kW",
    features: ["Variable Speed", "Smart Controls", "Low Noise"]
  },
  {
    id: "ductwork",
    title: "Smart Ductwork Systems", 
    description: "Intelligent ducting with integrated sensors and dampers",
    image: "/lovable-uploads/090ef473-7d4a-42d4-89ae-6c2ccb5979e9.png",
    icon: Settings,
    efficiency: "98% Flow",
    capacity: "Modular",
    features: ["Self-Balancing", "Leak Detection", "Zone Control"]
  },
  {
    id: "ventilation",
    title: "Kitchen Ventilation",
    description: "Commercial-grade kitchen exhaust with heat recovery",
    image: "/lovable-uploads/7a117102-335f-47b5-9ef0-a3f34878f631.png", 
    icon: Filter,
    efficiency: "85% Recovery",
    capacity: "500-5000 m³/h",
    features: ["Grease Filtration", "Fire Safety", "Energy Recovery"]
  },
  {
    id: "heat-pump",
    title: "Heat Pump Systems",
    description: "High-efficiency outdoor units with intelligent defrost",
    image: "/lovable-uploads/9e1ab8c4-bf28-46ef-8b1d-b8533cfb3fcd.png",
    icon: Thermometer,
    efficiency: "COP 4.8",
    capacity: "8-120 kW", 
    features: ["Inverter Drive", "R32 Refrigerant", "Weather Adaptive"]
  },
  {
    id: "vrf-system",
    title: "VRF Multi-Zone",
    description: "Variable refrigerant flow for precise zone control",
    image: "/lovable-uploads/9e1ab8c4-bf28-46ef-8b1d-b8533cfb3fcd.png",
    icon: Zap,
    efficiency: "SEER 20+",
    capacity: "16-200 kW",
    features: ["Heat Recovery", "Individual Control", "Part Load Efficiency"]
  },
  {
    id: "controls",
    title: "Smart Controls",
    description: "AI-powered building management and optimization",
    image: "/lovable-uploads/090ef473-7d4a-42d4-89ae-6c2ccb5979e9.png",
    icon: Eye,
    efficiency: "30% Savings",
    capacity: "Unlimited Zones",
    features: ["Machine Learning", "Predictive Maintenance", "Remote Access"]
  }
];

export const ProductShowcase = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <section id="products" className="py-24 bg-gradient-atmosphere relative">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-irasco-white mb-6">
            System <span className="text-transparent bg-gradient-energy bg-clip-text">Modules</span>
          </h2>
          <p className="text-xl text-irasco-white/80 font-inter max-w-3xl mx-auto">
            Each IRASCO module is a living component that communicates, adapts, and optimizes 
            your environment in real-time.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productData.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
            >
              
              {/* Glass Pod Container */}
              <motion.div
                className="glass-strong rounded-2xl p-6 h-full relative overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProduct(product.id)}
                animate={{
                  borderColor: hoveredProduct === product.id ? "hsl(var(--irasco-teal))" : "transparent",
                }}
                transition={{ duration: 0.3 }}
              >
                
                {/* Condensation Effect */}
                {hoveredProduct === product.id && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <svg className="absolute inset-0 w-full h-full">
                      <defs>
                        <linearGradient id={`frost-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="hsl(var(--irasco-teal))" stopOpacity="0.1" />
                          <stop offset="50%" stopColor="hsl(var(--irasco-white))" stopOpacity="0.05" />
                          <stop offset="100%" stopColor="hsl(var(--irasco-teal))" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      <motion.rect
                        width="100%"
                        height="100%"
                        fill={`url(#frost-${product.id})`}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                      />
                    </svg>
                  </motion.div>
                )}

                {/* Product Icon */}
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-energy"
                    animate={{
                      scale: hoveredProduct === product.id ? 1.1 : 1,
                      rotate: hoveredProduct === product.id ? 360 : 0,
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <product.icon className="w-6 h-6 text-irasco-midnight" />
                  </motion.div>
                  
                  <ExternalLink className="w-5 h-5 text-irasco-white/60 group-hover:text-irasco-teal transition-colors" />
                </div>

                {/* Product Image */}
                <div className="mb-6 relative h-32 flex items-center justify-center">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain filter drop-shadow-lg"
                    animate={{
                      rotateY: hoveredProduct === product.id ? 15 : 0,
                      scale: hoveredProduct === product.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Hologram Effect */}
                  {hoveredProduct === product.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-irasco-teal/10 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-irasco-white mb-2">
                      {product.title}
                    </h3>
                    <p className="text-irasco-white/70 font-inter text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-irasco-white/20">
                    <div>
                      <div className="text-irasco-teal font-bold text-sm">{product.efficiency}</div>
                      <div className="text-irasco-white/60 text-xs">Efficiency</div>
                    </div>
                    <div>
                      <div className="text-irasco-violet font-bold text-sm">{product.capacity}</div>
                      <div className="text-irasco-white/60 text-xs">Capacity</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-irasco-teal rounded-full" />
                        <span className="text-irasco-white/80 text-xs font-inter">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Efficiency Rings (HUD Style) */}
                {hoveredProduct === product.id && (
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    <svg className="w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="hsl(var(--irasco-teal))"
                        strokeWidth="2"
                        strokeDasharray="150"
                        strokeDashoffset="50"
                        className="animate-spin"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="20"
                        fill="none"
                        stroke="hsl(var(--irasco-violet))"
                        strokeWidth="1"
                        strokeDasharray="100"
                        strokeDashoffset="30"
                        className="animate-spin"
                        style={{ animationDirection: 'reverse', animationDuration: '3s' }}
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* System Integration Note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold text-irasco-white mb-4">
              Integrated Ecosystem
            </h3>
            <p className="text-irasco-white/80 font-inter leading-relaxed">
              Every IRASCO component works in harmony, sharing real-time data to optimize 
              performance, predict maintenance needs, and adapt to changing conditions. 
              Experience the future of intelligent climate control.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};