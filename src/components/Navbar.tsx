"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IrascoLogo } from "./IrascoLogo"
import { Button } from "./ui/button"
import { Menu, X, Phone } from "lucide-react"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 10)
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = 200 // Adjust this value to control animation speed
      const progress = Math.min(scrollY / maxScroll, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Clients", href: "#clients" },
  ]

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-irasco-midnight/95 backdrop-blur-md shadow-lg overflow-hidden"
          style={{
            opacity: isScrolled ? 1 : 0,
            transition: "opacity 0.3s ease"
          }}
        >
          {/* Scaling Background Image */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/sticky-bg-dark.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
            animate={{
              scale: isScrolled ? 1 : 0.3,
              x: isScrolled ? 0 : "50%",
              y: isScrolled ? 0 : "50%",
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-irasco-midnight/20" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <motion.div
              className="flex-shrink-0 z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <IrascoLogo
                size={isScrolled ? "small" : "large"}
                className={isScrolled ? "w-12 h-12" : "w-16 h-16 mt-10"}
              />
            </motion.div>

            {/* Large Duct Background - Desktop Only */}
            {!isScrolled && (
              <motion.div
                className="absolute inset-0 hidden lg:flex items-center justify-center mt-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {/* Centered Duct Background */}
                <div className="relative w-full max-w-3xl h-32 -mt-8">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                    style={{ backgroundImage: "url('/duct-bg.svg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-irasco-midnight/20 to-transparent" />
                </div>
              </motion.div>
            )}

            {/* Navigation Items - Desktop Only - Perfectly Centered */}
            <div className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-16">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="relative text-irasco-white font-bold text-sm uppercase tracking-wider hover:text-irasco-yellow transition-colors duration-200 group z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-irasco-yellow transition-all duration-300 group-hover:w-full rounded-full" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Side - Contact & Menu */}
            <div className="flex items-center space-x-2">
              {/* Contact Us Button */}
              <motion.div
                className="flex-shrink-0 z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* Desktop Version */}
                <Button className="hidden sm:flex items-center gap-3 h-12 px-6 rounded-full bg-gradient-to-r from-irasco-yellow to-yellow-400 hover:from-yellow-400 hover:to-irasco-yellow text-irasco-midnight transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-irasco-yellow/20">
                  <Phone className="w-5 h-5" />
                  <span className="font-bold text-sm uppercase tracking-wider">Contact Us</span>
                </Button>

                {/* Mobile Version - Icon Only */}
                <Button className="sm:hidden w-12 h-12 rounded-full bg-gradient-to-r from-irasco-yellow to-yellow-400 hover:from-yellow-400 hover:to-irasco-yellow text-irasco-midnight transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-irasco-yellow/20 p-0">
                  <Phone className="w-5 h-5" />
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden z-10 p-2 rounded-lg text-irasco-white hover:text-irasco-yellow transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar - Full Screen from Left */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Full Screen Sidebar */}
            <motion.div
              className="absolute inset-0 bg-irasco-midnight/95 backdrop-blur-md shadow-lg"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
            >
              {/* Close Button - Top Right */}
              <motion.button
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-irasco-white/10 text-irasco-white hover:text-irasco-yellow hover:bg-irasco-white/20 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Centered Navigation Content */}
              <div className="h-full flex flex-col items-center justify-center">
                {/* Navigation Items - Centered */}
                <nav className="text-center space-y-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        className="block text-irasco-white font-bold text-2xl uppercase tracking-wider hover:text-irasco-yellow transition-colors duration-300 py-4"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    </motion.div>
                  ))}
                </nav>

                {/* Contact Button - Bottom Center */}
                <motion.div
                  className="mt-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <Button
                    className="h-16 px-12 rounded-full bg-gradient-to-r from-irasco-yellow to-yellow-400 hover:from-yellow-400 hover:to-irasco-yellow text-irasco-midnight font-bold text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-xl border-2 border-irasco-yellow/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Phone className="w-6 h-6 mr-3" />
                    Contact Now
                  </Button>
                </motion.div>
              </div>

              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/duct-bg.svg')" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
