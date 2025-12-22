'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './snow-effect.module.css';
import { SNOW_EFFECT_CONFIG } from './snow-effect.constants';

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface SnowEffectProps {
  maxFlakes?: number;
}

/**
 * Create a single snowflake with random properties
 */
function createSnowflake(canvasWidth: number, canvasHeight: number): Snowflake {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size:
      Math.random() * (SNOW_EFFECT_CONFIG.maxSize - SNOW_EFFECT_CONFIG.minSize) +
      SNOW_EFFECT_CONFIG.minSize,
    speed:
      Math.random() * (SNOW_EFFECT_CONFIG.maxSpeed - SNOW_EFFECT_CONFIG.minSpeed) +
      SNOW_EFFECT_CONFIG.minSpeed,
    opacity:
      Math.random() * (SNOW_EFFECT_CONFIG.maxOpacity - SNOW_EFFECT_CONFIG.minOpacity) +
      SNOW_EFFECT_CONFIG.minOpacity,
  };
}

/**
 * Draw a single snowflake on canvas
 */
function drawSnowflake(ctx: CanvasRenderingContext2D, flake: Snowflake, canvasWidth: number): void {
  // Update position
  flake.y += flake.speed;
  flake.x +=
    Math.sin(flake.y * SNOW_EFFECT_CONFIG.horizontalDriftFrequency) *
    SNOW_EFFECT_CONFIG.horizontalDriftAmplitude;

  // Reset if off screen
  if (flake.y > ctx.canvas.height) {
    flake.y = SNOW_EFFECT_CONFIG.resetOffset;
    flake.x = Math.random() * canvasWidth;
  }

  // Draw snowflake with shadow for visibility on white background
  ctx.save();

  // Add shadow for visibility
  ctx.shadowColor = SNOW_EFFECT_CONFIG.shadow.color;
  ctx.shadowBlur = SNOW_EFFECT_CONFIG.shadow.blur;
  ctx.shadowOffsetX = SNOW_EFFECT_CONFIG.shadow.offsetX;
  ctx.shadowOffsetY = SNOW_EFFECT_CONFIG.shadow.offsetY;

  // Draw snowflake
  ctx.beginPath();
  ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);

  // Fill with white color and opacity
  const { r: fillR, g: fillG, b: fillB } = SNOW_EFFECT_CONFIG.colors.fill;
  ctx.fillStyle = `rgba(${fillR}, ${fillG}, ${fillB}, ${flake.opacity})`;
  ctx.fill();

  // Add subtle stroke for better visibility
  const strokeOpacity = flake.opacity * SNOW_EFFECT_CONFIG.strokeOpacityMultiplier;
  const { r: strokeR, g: strokeG, b: strokeB } = SNOW_EFFECT_CONFIG.colors.stroke;
  ctx.strokeStyle = `rgba(${strokeR}, ${strokeG}, ${strokeB}, ${strokeOpacity})`;
  ctx.lineWidth = SNOW_EFFECT_CONFIG.stroke.lineWidth;
  ctx.stroke();

  ctx.restore();
}

/**
 * Snow Effect Component
 * Creates animated snowflakes using canvas
 * Mobile-first responsive design
 */
export function SnowEffect({ maxFlakes = SNOW_EFFECT_CONFIG.defaultMaxFlakes }: SnowEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const resizeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    resizeCanvas(canvas);
    const handleResize = () => resizeCanvas(canvas);
    window.addEventListener('resize', handleResize);

    // Create snowflakes
    const snowflakes: Snowflake[] = Array.from({ length: maxFlakes }, () =>
      createSnowflake(canvas.width, canvas.height)
    );

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((flake) => {
        drawSnowflake(ctx, flake, canvas.width);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [maxFlakes, resizeCanvas]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
