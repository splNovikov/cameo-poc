/**
 * Constants for Snow Effect animation
 */

export const SNOW_EFFECT_CONFIG = {
  // Snowflake properties
  minSize: 1,
  maxSize: 4,
  minSpeed: 0.5,
  maxSpeed: 2.5,
  minOpacity: 0.3,
  maxOpacity: 0.8,
  strokeOpacityMultiplier: 0.3,

  // Animation properties
  horizontalDriftAmplitude: 0.5,
  horizontalDriftFrequency: 0.01,
  resetOffset: -10,

  // Shadow properties for visibility on white background
  shadow: {
    color: 'rgba(0, 0, 0, 0.1)',
    blur: 2,
    offsetX: 0.5,
    offsetY: 0.5,
  },

  // Stroke properties
  stroke: {
    lineWidth: 0.5,
  },

  // Snowflake color RGB values (opacity applied dynamically)
  colors: {
    fill: { r: 255, g: 255, b: 255 }, // White snow
    stroke: { r: 200, g: 200, b: 200 }, // Light gray stroke
  },

  // Default values
  defaultMaxFlakes: 50,
} as const;
