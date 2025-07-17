import { motion } from "framer-motion";
import { IrascoPolyhedron } from "./IrascoPolyhedron";
import { ArrowDown, Thermometer, Wind, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-atmosphere particle-trail">
      {/* Background Cloud Tunnel Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-irasco-midnight via-irasco-graphite to-irasco-midnight animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-irasco-teal/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Hero Content */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1 
              className="font-exo text-6xl lg:text-7xl font-bold text-irasco-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Living
              <span className="block text-transparent bg-gradient-energy bg-clip-text neon-glow">
                Atmosphere
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl text-irasco-white/80 font-inter leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              Experience HVAC systems that breathe with your space. IRASCO's intelligent 
              climate solutions adapt, learn, and evolve to create the perfect atmosphere.
            </motion.p>

            {/* Climate Stats */}
            <motion.div 
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <div className="glass p-4 rounded-xl flex items-center space-x-3">
                <Thermometer className="w-6 h-6 text-irasco-teal" />
                <div>
                  <div className="text-irasco-white font-bold">22°C</div>
                  <div className="text-irasco-white/60 text-sm">Optimal</div>
                </div>
              </div>
              
              <div className="glass p-4 rounded-xl flex items-center space-x-3">
                <Wind className="w-6 h-6 text-irasco-violet" />
                <div>
                  <div className="text-irasco-white font-bold">95%</div>
                  <div className="text-irasco-white/60 text-sm">Efficiency</div>
                </div>
              </div>
              
              <div className="glass p-4 rounded-xl flex items-center space-x-3">
                <Zap className="w-6 h-6 text-irasco-yellow" />
                <div>
                  <div className="text-irasco-white font-bold">COP 4.8</div>
                  <div className="text-irasco-white/60 text-sm">Performance</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-energy rounded-xl font-exo font-bold text-irasco-midnight hover:scale-105 transition-transform neon-border"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Systems
              </motion.button>
              
              <motion.button
                className="px-8 py-4 glass-strong rounded-xl font-exo font-medium text-irasco-white hover:text-irasco-teal transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - IRASCO Polyhedron */}
          <motion.div 
            className="h-[600px] relative"
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
          >
            <IrascoPolyhedron />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2 text-irasco-white/60"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-inter">Discover More</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Environmental Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-irasco-teal/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  );
};