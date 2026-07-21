import { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface AnimatedCharProps {
  char: string;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
}

const AnimatedChar = memo(function AnimatedChar({
  char,
  start,
  end,
  scrollYProgress,
}: AnimatedCharProps) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <motion.span
      style={{
        opacity,
        display: 'inline',
        position: 'relative',
      }}
      aria-hidden="true"
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
});

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');

  if (shouldReduceMotion) {
    return (
      <p ref={ref} className={className} style={style}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={`${className} relative`} style={{ wordBreak: 'break-word', ...style }}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + 1 / characters.length;
        return (
          <AnimatedChar
            key={i}
            char={char}
            start={start}
            end={end}
            scrollYProgress={scrollYProgress}
          />
        );
      })}
    </p>
  );
}
