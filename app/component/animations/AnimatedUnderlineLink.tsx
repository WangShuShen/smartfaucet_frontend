"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
}

const underlineVariants = {
  initial: {
    width: "20%",
  },
  hover: {
    width: "100%",
    backgroundColor: "#02253C",
    transition: { duration: 0.3 },
  },
};

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ href, children }) => (
  <motion.div
    className="underline-animation"
    variants={underlineVariants}
    initial="initial"
    whileHover="hover"
  >
    <a href={href} className="flex font-semibold my-7 mx-4 text-lg">
      {children}
    </a>
  </motion.div>
);

export default AnimatedLink;
