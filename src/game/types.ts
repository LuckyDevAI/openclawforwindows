export interface Vec2 {
  x: number;
  y: number;
}

export interface Player {
  pos: Vec2;
  vel: Vec2;
  width: number;
  height: number;
  onGround: boolean;
  facing: 'left' | 'right';
  attacking: boolean;
  attackTimer: number;
  health: number;
  maxHealth: number;
  invincibleTimer: number;
  frame: number;
  frameTimer: number;
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'ground' | 'stone' | 'wood';
}

export interface Collectible {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'gem-red' | 'gem-green' | 'gem-blue' | 'gold';
  collected: boolean;
  bobOffset: number;
}

export interface Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  vel: Vec2;
  type: 'soldier' | 'rat';
  health: number;
  alive: boolean;
  patrolLeft: number;
  patrolRight: number;
  facing: 'left' | 'right';
  frame: number;
  frameTimer: number;
}

export interface GameState {
  player: Player;
  platforms: Platform[];
  collectibles: Collectible[];
  enemies: Enemy[];
  camera: Vec2;
  score: number;
  lives: number;
  level: number;
  gameStatus: 'menu' | 'playing' | 'gameover' | 'win';
  levelWidth: number;
  levelHeight: number;
  keys: Set<string>;
  time: number;
}
