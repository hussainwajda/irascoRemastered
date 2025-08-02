import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Wrench, Leaf, Phone, Menu } from "lucide-react";
import { IrascoLogo } from "./IrascoLogo";

export const EnergyRibbon = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate scroll progress (0-100%)
  const scrollProgress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1);
  
  // Generate dynamic gradient based on scroll
  const gradientStyle = {
    background: `linear-gradient(90deg, 
      hsl(165, 86%, 55%) ${scrollProgress * 30}%, 
      hsl(258, 100%, 69%) ${30 + scrollProgress * 40}%, 
      hsl(186, 100%, 96%) ${70 + scrollProgress * 30}%)`
  };

  const navLinks = [
    { icon: Home, label: "Atmosphere", href: "#hero" },
    { icon: Wrench, label: "Systems", href: "#products" },
    { icon: Leaf, label: "Sustainability", href: "#sustainability" },
    { icon: Phone, label: "Contact", href: "#contact" }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={gradientStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="glass backdrop-blur-xl">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            animate={{ scale: isScrolled ? 0.8 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <IrascoLogo size="small" />
            {!isScrolled && (
              <motion.div 
                className="text-irasco-white font-bold text-xl"
                exit={{ opacity: 0, x: -20 }}
              >
                IRASCO
              </motion.div>
            )}
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex">
            <motion.div 
              className={`flex items-center space-x-2 transition-all duration-300 ${
                isScrolled ? 'flex-col space-y-2 space-x-0' : 'flex-row'
              }`}
              animate={{ 
                x: isScrolled ? 20 : 0,
                y: isScrolled ? -5 : 0 
              }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-lg 
                    glass-strong text-irasco-white hover:text-irasco-teal 
                    transition-all duration-300 ${
                    isScrolled ? 'p-2' : 'px-4 py-2'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <link.icon className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'} transition-all`} />
                  {!isScrolled && (
                    <span className="font-inter font-medium text-sm group-hover:neon-glow">
                      {link.label}
                    </span>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </nav>

          {/* Mobile menu button */}
          <motion.button 
            className="md:hidden glass-strong p-2 rounded-lg text-irasco-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};