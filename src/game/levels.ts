import { Platform, Collectible, Enemy, Vec2 } from './types';

interface LevelData {
  platforms: Platform[];
  collectibles: Collectible[];
  enemies: Enemy[];
  playerStart: Vec2;
  width: number;
  height: number;
}

export function createLevel1(): LevelData {
  const platforms: Platform[] = [
    // Ground
    { x: 0, y: 500, width: 600, height: 80, type: 'ground' },
    { x: 700, y: 500, width: 400, height: 80, type: 'ground' },
    { x: 1200, y: 500, width: 300, height: 80, type: 'ground' },
    { x: 1600, y: 500, width: 500, height: 80, type: 'ground' },
    { x: 2200, y: 500, width: 600, height: 80, type: 'ground' },
    { x: 2900, y: 500, width: 500, height: 80, type: 'ground' },

    // Floating platforms
    { x: 200, y: 380, width: 120, height: 24, type: 'stone' },
    { x: 420, y: 300, width: 100, height: 24, type: 'wood' },
    { x: 620, y: 360, width: 80, height: 24, type: 'stone' },
    { x: 800, y: 280, width: 140, height: 24, type: 'wood' },
    { x: 1050, y: 380, width: 100, height: 24, type: 'stone' },
    { x: 1250, y: 320, width: 120, height: 24, type: 'stone' },
    { x: 1450, y: 400, width: 80, height: 24, type: 'wood' },
    { x: 1550, y: 300, width: 100, height: 24, type: 'stone' },
    { x: 1800, y: 350, width: 140, height: 24, type: 'wood' },
    { x: 2050, y: 280, width: 100, height: 24, type: 'stone' },
    { x: 2400, y: 360, width: 120, height: 24, type: 'wood' },
    { x: 2600, y: 300, width: 100, height: 24, type: 'stone' },
    { x: 2900, y: 380, width: 140, height: 24, type: 'stone' },

    // High platforms
    { x: 350, y: 200, width: 80, height: 24, type: 'stone' },
    { x: 900, y: 160, width: 100, height: 24, type: 'stone' },
    { x: 1350, y: 180, width: 80, height: 24, type: 'wood' },
    { x: 2300, y: 200, width: 100, height: 24, type: 'stone' },
  ];

  const collectibles: Collectible[] = [
    // Ground-level coins
    ...Array.from({ length: 5 }, (_, i) => ({
      x: 100 + i * 50, y: 470, width: 16, height: 16,
      type: 'gold' as const, collected: false, bobOffset: i * 0.5,
    })),
    // Floating gems
    { x: 240, y: 345, width: 16, height: 16, type: 'gem-red', collected: false, bobOffset: 1 },
    { x: 450, y: 265, width: 16, height: 16, type: 'gem-blue', collected: false, bobOffset: 2 },
    { x: 830, y: 245, width: 16, height: 16, type: 'gem-green', collected: false, bobOffset: 3 },
    { x: 375, y: 165, width: 16, height: 16, type: 'gem-red', collected: false, bobOffset: 4 },
    { x: 935, y: 125, width: 16, height: 16, type: 'gem-blue', collected: false, bobOffset: 5 },
    // More coins along the path
    ...Array.from({ length: 4 }, (_, i) => ({
      x: 750 + i * 40, y: 470, width: 16, height: 16,
      type: 'gold' as const, collected: false, bobOffset: 6 + i * 0.3,
    })),
    ...Array.from({ length: 6 }, (_, i) => ({
      x: 1650 + i * 45, y: 470, width: 16, height: 16,
      type: 'gold' as const, collected: false, bobOffset: 10 + i * 0.4,
    })),
    { x: 1570, y: 265, width: 16, height: 16, type: 'gem-green', collected: false, bobOffset: 16 },
    { x: 1840, y: 315, width: 16, height: 16, type: 'gem-red', collected: false, bobOffset: 17 },
    { x: 2340, y: 165, width: 16, height: 16, type: 'gem-blue', collected: false, bobOffset: 18 },
    ...Array.from({ length: 5 }, (_, i) => ({
      x: 2250 + i * 50, y: 470, width: 16, height: 16,
      type: 'gold' as const, collected: false, bobOffset: 19 + i * 0.3,
    })),
    ...Array.from({ length: 4 }, (_, i) => ({
      x: 2950 + i * 40, y: 470, width: 16, height: 16,
      type: 'gold' as const, collected: false, bobOffset: 24 + i * 0.3,
    })),
  ];

  const enemies: Enemy[] = [
    {
      x: 350, y: 460, width: 28, height: 40, vel: { x: 40, y: 0 },
      type: 'soldier', health: 2, alive: true,
      patrolLeft: 250, patrolRight: 550, facing: 'left', frame: 0, frameTimer: 0,
    },
    {
      x: 800, y: 475, width: 24, height: 18, vel: { x: 60, y: 0 },
      type: 'rat', health: 1, alive: true,
      patrolLeft: 720, patrolRight: 1050, facing: 'right', frame: 0, frameTimer: 0,
    },
    {
      x: 1700, y: 460, width: 28, height: 40, vel: { x: 35, y: 0 },
      type: 'soldier', health: 2, alive: true,
      patrolLeft: 1620, patrolRight: 1900, facing: 'left', frame: 0, frameTimer: 0,
    },
    {
      x: 2000, y: 475, width: 24, height: 18, vel: { x: 70, y: 0 },
      type: 'rat', health: 1, alive: true,
      patrolLeft: 1950, patrolRight: 2150, facing: 'right', frame: 0, frameTimer: 0,
    },
    {
      x: 2500, y: 460, width: 28, height: 40, vel: { x: 45, y: 0 },
      type: 'soldier', health: 3, alive: true,
      patrolLeft: 2300, patrolRight: 2700, facing: 'left', frame: 0, frameTimer: 0,
    },
    {
      x: 3000, y: 475, width: 24, height: 18, vel: { x: 80, y: 0 },
      type: 'rat', health: 1, alive: true,
      patrolLeft: 2920, patrolRight: 3200, facing: 'right', frame: 0, frameTimer: 0,
    },
  ];

  return {
    platforms,
    collectibles,
    enemies,
    playerStart: { x: 60, y: 440 },
    width: 3500,
    height: 580,
  };
}
