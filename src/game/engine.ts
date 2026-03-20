import { GameState, Player } from './types';
import { createLevel1 } from './levels';

const GRAVITY = 800;
const JUMP_VEL = -380;
const MOVE_SPEED = 200;
const ATTACK_DURATION = 0.3;
const INVINCIBLE_DURATION = 1.5;
const SWORD_RANGE = 36;

export function createInitialState(): GameState {
  const level = createLevel1();
  return {
    player: {
      pos: { ...level.playerStart },
      vel: { x: 0, y: 0 },
      width: 28,
      height: 32,
      onGround: false,
      facing: 'right',
      attacking: false,
      attackTimer: 0,
      health: 100,
      maxHealth: 100,
      invincibleTimer: 0,
      frame: 0,
      frameTimer: 0,
    },
    platforms: level.platforms,
    collectibles: level.collectibles,
    enemies: level.enemies,
    camera: { x: 0, y: 0 },
    score: 0,
    lives: 3,
    level: 1,
    gameStatus: 'menu',
    levelWidth: level.width,
    levelHeight: level.height,
    keys: new Set(),
    time: 0,
  };
}

export function updateGame(state: GameState, dt: number): GameState {
  if (state.gameStatus !== 'playing') return state;

  const s = { ...state };
  s.time += dt;
  s.player = { ...s.player };

  updatePlayer(s, dt);
  updateEnemies(s, dt);
  checkCollectibles(s);
  updateCamera(s, 800, 600);

  // Win condition - reach end of level
  if (s.player.pos.x > s.levelWidth - 100) {
    s.gameStatus = 'win';
  }

  // Death - fall off screen
  if (s.player.pos.y > s.levelHeight + 50) {
    s.lives--;
    if (s.lives <= 0) {
      s.gameStatus = 'gameover';
    } else {
      const level = createLevel1();
      s.player.pos = { ...level.playerStart };
      s.player.vel = { x: 0, y: 0 };
      s.player.health = s.player.maxHealth;
      s.player.invincibleTimer = INVINCIBLE_DURATION;
    }
  }

  return s;
}

function updatePlayer(s: GameState, dt: number) {
  const p = s.player;

  // Horizontal movement
  let moveX = 0;
  if (s.keys.has('ArrowLeft') || s.keys.has('a')) { moveX -= 1; p.facing = 'left'; }
  if (s.keys.has('ArrowRight') || s.keys.has('d')) { moveX += 1; p.facing = 'right'; }
  p.vel.x = moveX * MOVE_SPEED;

  // Jump
  if ((s.keys.has('ArrowUp') || s.keys.has('w') || s.keys.has(' ')) && p.onGround) {
    p.vel.y = JUMP_VEL;
    p.onGround = false;
  }

  // Attack
  if (p.attacking) {
    p.attackTimer -= dt;
    if (p.attackTimer <= 0) {
      p.attacking = false;
    }
  }

  // Invincibility
  if (p.invincibleTimer > 0) {
    p.invincibleTimer -= dt;
  }

  // Gravity
  p.vel.y += GRAVITY * dt;

  // Move X
  p.pos.x += p.vel.x * dt;
  resolveCollisionsX(p, s);

  // Move Y
  p.pos.y += p.vel.y * dt;
  p.onGround = false;
  resolveCollisionsY(p, s);

  // Clamp position
  p.pos.x = Math.max(0, Math.min(s.levelWidth - p.width, p.pos.x));
}

function resolveCollisionsX(p: Player, s: GameState) {
  for (const plat of s.platforms) {
    if (boxOverlap(p.pos.x, p.pos.y, p.width, p.height, plat.x, plat.y, plat.width, plat.height)) {
      if (p.vel.x > 0) {
        p.pos.x = plat.x - p.width;
      } else if (p.vel.x < 0) {
        p.pos.x = plat.x + plat.width;
      }
      p.vel.x = 0;
    }
  }
}

function resolveCollisionsY(p: Player, s: GameState) {
  for (const plat of s.platforms) {
    if (boxOverlap(p.pos.x, p.pos.y, p.width, p.height, plat.x, plat.y, plat.width, plat.height)) {
      if (p.vel.y > 0) {
        p.pos.y = plat.y - p.height;
        p.vel.y = 0;
        p.onGround = true;
      } else if (p.vel.y < 0) {
        p.pos.y = plat.y + plat.height;
        p.vel.y = 0;
      }
    }
  }
}

function updateEnemies(s: GameState, dt: number) {
  s.enemies = s.enemies.map(e => {
    if (!e.alive) return e;
    const ne = { ...e };

    // Patrol
    ne.x += ne.vel.x * dt * (ne.facing === 'right' ? 1 : -1);
    if (ne.x <= ne.patrolLeft) { ne.facing = 'right'; ne.x = ne.patrolLeft; }
    if (ne.x >= ne.patrolRight) { ne.facing = 'left'; ne.x = ne.patrolRight; }

    // Check player attack hit
    if (s.player.attacking && s.player.attackTimer > 0.15) {
      const swordX = s.player.facing === 'right'
        ? s.player.pos.x + s.player.width
        : s.player.pos.x - SWORD_RANGE;
      if (boxOverlap(swordX, s.player.pos.y, SWORD_RANGE, s.player.height, ne.x, ne.y, ne.width, ne.height)) {
        ne.health--;
        if (ne.health <= 0) {
          ne.alive = false;
          s.score += ne.type === 'soldier' ? 200 : 100;
        }
      }
    }

    // Damage player
    if (s.player.invincibleTimer <= 0 && boxOverlap(
      s.player.pos.x, s.player.pos.y, s.player.width, s.player.height,
      ne.x, ne.y, ne.width, ne.height
    )) {
      s.player.health -= ne.type === 'soldier' ? 20 : 10;
      s.player.invincibleTimer = INVINCIBLE_DURATION;
      // Knockback
      s.player.vel.x = s.player.pos.x < ne.x ? -200 : 200;
      s.player.vel.y = -150;

      if (s.player.health <= 0) {
        s.lives--;
        if (s.lives <= 0) {
          s.gameStatus = 'gameover';
        } else {
          const level = createLevel1();
          s.player.pos = { ...level.playerStart };
          s.player.vel = { x: 0, y: 0 };
          s.player.health = s.player.maxHealth;
          s.player.invincibleTimer = INVINCIBLE_DURATION;
        }
      }
    }

    return ne;
  });
}

function checkCollectibles(s: GameState) {
  s.collectibles = s.collectibles.map(c => {
    if (c.collected) return c;
    if (boxOverlap(s.player.pos.x, s.player.pos.y, s.player.width, s.player.height,
      c.x, c.y, c.width, c.height)) {
      const scores: Record<string, number> = {
        'gold': 50,
        'gem-red': 100,
        'gem-green': 150,
        'gem-blue': 200,
      };
      s.score += scores[c.type] || 50;
      return { ...c, collected: true };
    }
    return c;
  });
}

function updateCamera(s: GameState, canvasW: number, canvasH: number) {
  const targetX = s.player.pos.x - canvasW / 3;
  const targetY = s.player.pos.y - canvasH / 2;
  s.camera.x += (targetX - s.camera.x) * 0.1;
  s.camera.y += (targetY - s.camera.y) * 0.1;
  s.camera.x = Math.max(0, Math.min(s.levelWidth - canvasW, s.camera.x));
  s.camera.y = Math.max(0, Math.min(s.levelHeight - canvasH, s.camera.y));
}

function boxOverlap(ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number): boolean {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}
