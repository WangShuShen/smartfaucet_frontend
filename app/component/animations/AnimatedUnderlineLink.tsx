"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
}

const underlineVariants = {
  hover: {
    color: "#02253C",
    transition: { duration: 0.3 },
  },
};

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ href, children }) => (
  <motion.div className="underline-animation" whileHover="hover">
    <motion.a
      href={href}
      className="flex font-bold my-7 mx-4 text-lg"
      variants={underlineVariants}
      initial={{ color: "#118BBB" }}
      whileHover={{ color: "#02253C" }}
    >
      {children}
      <motion.div
        className="absolute bottom-5 left-4 h-0.5"
        initial={{ backgroundColor: "#118BBB", width: "70%" }}
        whileHover={{ backgroundColor: "#02253C", width: "80%" }}
        variants={underlineVariants}
      />
    </motion.a>
  </motion.div>
);

export default AnimatedLink;
