import { motion } from "framer-motion";

export const IrascoLogo = ({ className = "", size = "medium" }: { className?: string; size?: "small" | "medium" | "large" }) => {
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24", 
    large: "w-32 h-32"
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <img 
        src="/lovable-uploads/d3fac077-8817-4abf-801c-aa5b5bb25f05.png" 
        alt="IRASCO - Ducting & Ventilation Work" 
        className="w-full h-full object-contain filter drop-shadow-lg"
      />
    </motion.div>
  );
};