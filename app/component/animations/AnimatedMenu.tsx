'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedMenuProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const menuVariants = {
  open: {
    x: 0,
    opacity: 1,
    display: 'block',
    transition: { type: 'spring', duration: 0.2 }
  },
  closed: {
    x: '-100%',
    opacity: 0,
    transition: { type: 'spring', duration: 0.2},
    transitionEnd: { display: 'none' }
  }
};

const AnimatedMenu: React.FC<AnimatedMenuProps> = ({ isOpen, children }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-1/5 h-full bg-white shadow-md"
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedMenu;
