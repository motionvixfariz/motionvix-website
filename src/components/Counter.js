import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function Counter({ value }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    // Animate from 0 to the target value
    const animation = animate(count, value, {
      duration: 2,
      ease: "easeOut"
    });

    return animation.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}