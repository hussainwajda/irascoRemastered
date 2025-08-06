import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IrascoLogo } from "./IrascoLogo"
import { Button } from "./ui/button"
import { Menu, X, Phone } from "lucide-react"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/#testimonials" },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[url('/sticky-bg-dark.svg')] bg-cover bg-center bg-no-repeat"
            : "bg-transparent mt-2"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* overlay on fixed navbar for better contrast */}
        {/* Desktop Rounded Container - Only when not scrolled */}
        {!isScrolled && (
          <motion.div
            className="absolute inset-0 hidden h-20 lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-full max-w-2xl h-20 mx-6 rounded-full border border-white/20 bg-irasco-midnight/90 backdrop-blur-md shadow-xl overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Properly fitted background image */}
              <div
                className="absolute inset-0 !bg-cover bg-center bg-no-repeat opacity-80"
                style={{
                  backgroundImage: "url('/sticky-bg-dark.svg')",
                }}
              />

              {/* Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-irasco-midnight/40 via-transparent to-irasco-midnight/40" />
            </motion.div>
          </motion.div>
        )}

        {/* Scrolled state overlay for better contrast */}
         {isScrolled && (
           <div className="absolute inset-0 bg-irasco-midnight/90 backdrop-blur-md">
             {/* Properly fitted background image */}
             <div
               className="absolute inset-0 !bg-cover bg-center bg-no-repeat opacity-80"
               style={{
                 backgroundImage: "url('/sticky-bg-dark.svg')",
               }}
             />
             
             {/* Overlay for better contrast */}
             <div className="absolute inset-0 bg-gradient-to-r from-irasco-midnight/40 via-transparent to-irasco-midnight/40" />
           </div>
         )}

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <motion.div
              className="flex-shrink-0 z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <IrascoLogo size={isScrolled ? "small" : "large"} className={isScrolled ? "w-12 h-12" : "w-16 h-16"} />
            </motion.div>

            {/* Navigation Items - Desktop Only - Perfectly Centered */}
            <div className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-12">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="relative text-irasco-white font-bold text-sm uppercase tracking-wider hover:text-irasco-yellow transition-all duration-300 group z-10 px-4 py-2 rounded-full hover:bg-white/10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      textShadow: "0 0 15px rgba(255, 193, 7, 0.8)",
                    }}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-irasco-yellow transition-all duration-300 group-hover:w-3/4 rounded-full" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Side - Contact & Menu */}
            <div className="flex items-center space-x-3">
              {/* Contact Us Button */}
              <motion.div
                className="flex-shrink-0 z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* Desktop Version */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(255, 193, 7, 0.6)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="hidden sm:flex items-center gap-3 h-12 px-6 rounded-full bg-gradient-to-r from-irasco-yellow via-yellow-400 to-irasco-yellow hover:from-yellow-400 hover:via-irasco-yellow hover:to-yellow-400 text-irasco-midnight transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-yellow-300/30 font-bold text-sm uppercase tracking-wider">
                    <Phone className="w-5 h-5" />
                    <span>Contact Us</span>
                  </Button>
                </motion.div>

                {/* Mobile Version - Icon Only */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(255, 193, 7, 0.6)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="sm:hidden w-12 h-12 rounded-full bg-gradient-to-r from-irasco-yellow via-yellow-400 to-irasco-yellow hover:from-yellow-400 hover:via-irasco-yellow hover:to-yellow-400 text-irasco-midnight transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-yellow-300/30 p-0">
                    <Phone className="w-5 h-5" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden z-10 p-3 rounded-full bg-white/10 text-irasco-white hover:text-irasco-yellow hover:bg-white/20 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar - Full Screen from Left - No Background Shapes */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Full Screen Sidebar - Clean Background */}
            <motion.div
              className="absolute inset-0 bg-irasco-midnight"
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
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 text-irasco-white hover:text-irasco-yellow hover:bg-white/20 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
                }}
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
                      <motion.a
                        href={item.href}
                        className="block text-irasco-white font-bold text-2xl uppercase tracking-wider hover:text-irasco-yellow transition-all duration-300 py-4 px-8 rounded-full hover:bg-white/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                        whileHover={{
                          scale: 1.05,
                          textShadow: "0 0 15px rgba(255, 193, 7, 0.8)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.name}
                      </motion.a>
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
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(255, 193, 7, 0.6)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="h-16 px-12 rounded-full bg-gradient-to-r from-irasco-yellow via-yellow-400 to-irasco-yellow hover:from-yellow-400 hover:via-irasco-yellow hover:to-yellow-400 text-irasco-midnight font-bold text-lg uppercase tracking-wider transition-all duration-300 shadow-xl border-2 border-yellow-300/30"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Phone className="w-6 h-6 mr-3" />
                      Contact Now
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Subtle Background Pattern - Very Minimal */}
              {/* <div className="absolute inset-0 opacity-3">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/duct-bg.svg')" }}
                />
              </div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
