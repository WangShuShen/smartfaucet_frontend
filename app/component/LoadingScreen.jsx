import { motion } from "framer-motion";
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        style={{ borderTopColor: "transparent" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}
