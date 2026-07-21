import { useRef, useState, useEffect, useCallback, type ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
  style,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = useRef(false);
  const rafRef = useRef<number>(0);
  const pendingOffset = useRef({ x: 0, y: 0 });

  const updateTransform = useCallback(() => {
    if (!ref.current) return;
    const { x, y } = pendingOffset.current;
    const active = x !== 0 || y !== 0;
    setIsActive(active);
    setOffset({ x, y });
  }, []);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const el = ref.current;
    if (!el || reducedMotion.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const threshold = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < threshold) {
        pendingOffset.current = { x: distX / strength, y: distY / strength };
      } else {
        pendingOffset.current = { x: 0, y: 0 };
      }

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          updateTransform();
          rafRef.current = 0;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [padding, strength, updateTransform]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: reducedMotion.current ? undefined : 'transform',
        transition: reducedMotion.current
          ? undefined
          : isActive
            ? activeTransition
            : inactiveTransition,
        transform:
          reducedMotion.current
            ? undefined
            : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
