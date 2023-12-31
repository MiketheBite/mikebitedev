import { motion, useAnimation } from "framer-motion";
import React, { ReactNode, useEffect, useState } from "react";

interface RubberAnimationProps {
  className?: string;
  children: React.ReactNode;
}

const getRandomColor = () => {
  const colors = [
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-red-500",
    "text-purple-500",
    "text-cyan-500",
    "text-pink-500",
    "text-orange-500",
    "text-indigo-500",
  ];

  const shuffledColors = colors.sort(() => Math.random() - 0.5);
  const randomIndex = Math.floor(Math.random() * shuffledColors.length);
  return shuffledColors[randomIndex];
};

const rubberBandScale = [
  "scale(1,1)",
  "scale(1.4, .55)",
  "scale(.75,1.25)",
  "scale(1.25, .85)",
  "scale(.9,1.05)",
  "scale(1,1)",
];

export const RubberAnimation: React.FC<RubberAnimationProps> = ({
  className,
  children,
}) => {
  const randomColor = getRandomColor();
  const controls = useAnimation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const playRubberBandAnimation = () => {
    controls.start({
      transform: rubberBandScale,
      transition: {
        times: [0, 0.4, 0.6, 0.7, 0.8, 0.9],
      },
    });
    setIsPlaying(true);
  };

  const handleHoverStart = () => {
    if (!isPlaying) {
      playRubberBandAnimation();
      setIsHovered(true);
    }
  };

  const handleAnimationComplete = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      playRubberBandAnimation();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [playRubberBandAnimation]);

  return (
    <motion.span
      animate={controls}
      onTap={() => {
        if (!isPlaying) {
          playRubberBandAnimation();
        }
      }}
      onHoverStart={handleHoverStart}
      onAnimationComplete={handleAnimationComplete}
      className={`font-bold text-3xl inline-block ${
        isHovered ? getRandomColor() : ""
      } ${className || ""}`}
    >
      {children}{" "}
    </motion.span>
  );
};
