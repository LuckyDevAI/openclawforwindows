import { GameState, Player, Platform, Collectible, Enemy } from './types';

const COLORS = {
  sky: '#1a6b8a',
  skyGradientTop: '#0d3d52',
  skyGradientBottom: '#2a8ab0',
  ground: '#6b4c2a',
  groundDark: '#4a3520',
  stone: '#6b7b8a',
  stoneDark: '#4a5a6a',
  wood: '#8b6b3a',
  woodDark: '#6b4c2a',
  playerBody: '#d4a030',
  playerOutline: '#2a1a0a',
  playerEyes: '#ffffff',
  playerPupil: '#1a1a1a',
  playerHat: '#c0392b',
  playerSword: '#cccccc',
  swordGlow: '#ffffff',
  gemRed: '#e74c3c',
  gemGreen: '#27ae60',
  gemBlue: '#3498db',
  gold: '#f1c40f',
  goldDark: '#d4a017',
  soldierBody: '#2c3e50',
  soldierSkin: '#e8b89d',
  ratBody: '#7f6b5a',
  healthBar: '#e74c3c',
  healthBarBg: '#4a1a1a',
  cloud: 'rgba(255,255,255,0.15)',
  star: 'rgba(255,255,200,0.6)',
};

export function renderGame(ctx: CanvasRenderingContext2D, state: GameState, canvasW: number, canvasH: number) {
  const cx = state.camera.x;
  const cy = state.camera.y;

  // Sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, canvasH);
  grad.addColorStop(0, COLORS.skyGradientTop);
  grad.addColorStop(1, COLORS.skyGradientBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvasW, canvasH);

  // Parallax clouds
  for (let i = 0; i < 8; i++) {
    const cloudX = ((i * 320 + 100) - cx * 0.3) % (canvasW + 200) - 100;
    const cloudY = 40 + (i % 3) * 60;
    ctx.fillStyle = COLORS.cloud;
    ctx.beginPath();
    ctx.ellipse(cloudX, cloudY, 60 + (i % 3) * 20, 15 + (i % 2) * 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cloudX + 30, cloudY - 8, 40, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Stars (distant)
  for (let i = 0; i < 30; i++) {
    const sx = ((i * 173 + 50) - cx * 0.1) % canvasW;
    const sy = (i * 37 + 10) % (canvasH * 0.5);
    const blink = Math.sin(state.time * 2 + i) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(255,255,200,${0.3 * blink})`;
    ctx.fillRect(sx, sy, 2, 2);
  }

  ctx.save();
  ctx.translate(-cx, -cy);

  // Platforms
  state.platforms.forEach(p => renderPlatform(ctx, p));

  // Collectibles
  state.collectibles.forEach(c => {
    if (!c.collected) renderCollectible(ctx, c, state.time);
  });

  // Enemies
  state.enemies.forEach(e => {
    if (e.alive) renderEnemy(ctx, e, state.time);
  });

  // Player
  renderPlayer(ctx, state.player, state.time);

  ctx.restore();
}

function renderPlatform(ctx: CanvasRenderingContext2D, p: Platform) {
  const colors = {
    ground: [COLORS.ground, COLORS.groundDark],
    stone: [COLORS.stone, COLORS.stoneDark],
    wood: [COLORS.wood, COLORS.woodDark],
  };
  const [main, dark] = colors[p.type];

  ctx.fillStyle = dark;
  ctx.fillRect(p.x, p.y + 4, p.width, p.height - 4);

  ctx.fillStyle = main;
  ctx.fillRect(p.x, p.y, p.width, p.height - 4);

  // Brick lines for stone/ground
  if (p.type !== 'wood') {
    ctx.strokeStyle = dark;
    ctx.lineWidth = 1;
    for (let row = 0; row < Math.floor(p.height / 16); row++) {
      const y = p.y + row * 16;
      ctx.beginPath();
      ctx.moveTo(p.x, y);
      ctx.lineTo(p.x + p.width, y);
      ctx.stroke();
      const offset = (row % 2) * 24;
      for (let col = offset; col < p.width; col += 48) {
        ctx.beginPath();
        ctx.moveTo(p.x + col, y);
        ctx.lineTo(p.x + col, y + 16);
        ctx.stroke();
      }
    }
  } else {
    // Wood grain
    ctx.strokeStyle = COLORS.woodDark;
    ctx.lineWidth = 1;
    for (let i = 0; i < p.width; i += 12) {
      ctx.beginPath();
      ctx.moveTo(p.x + i, p.y);
      ctx.lineTo(p.x + i, p.y + p.height);
      ctx.stroke();
    }
  }

  // Top edge highlight
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillRect(p.x, p.y, p.width, 3);
}

function renderCollectible(ctx: CanvasRenderingContext2D, c: Collectible, time: number) {
  const bob = Math.sin(time * 3 + c.bobOffset) * 4;
  const y = c.y + bob;

  const colorMap: Record<string, string> = {
    'gem-red': COLORS.gemRed,
    'gem-green': COLORS.gemGreen,
    'gem-blue': COLORS.gemBlue,
    'gold': COLORS.gold,
  };

  if (c.type === 'gold') {
    // Gold coin
    ctx.fillStyle = COLORS.goldDark;
    ctx.beginPath();
    ctx.arc(c.x + c.width / 2, y + c.height / 2, c.width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.gold;
    ctx.beginPath();
    ctx.arc(c.x + c.width / 2 - 1, y + c.height / 2 - 1, c.width / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    // $ symbol
    ctx.fillStyle = COLORS.goldDark;
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('$', c.x + c.width / 2, y + c.height / 2 + 4);
  } else {
    // Gem - diamond shape
    const cx = c.x + c.width / 2;
    const cy2 = y + c.height / 2;
    ctx.fillStyle = colorMap[c.type];
    ctx.beginPath();
    ctx.moveTo(cx, cy2 - c.height / 2);
    ctx.lineTo(cx + c.width / 2, cy2);
    ctx.lineTo(cx, cy2 + c.height / 2);
    ctx.lineTo(cx - c.width / 2, cy2);
    ctx.closePath();
    ctx.fill();

    // Shine
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath();
    ctx.moveTo(cx, cy2 - c.height / 2 + 3);
    ctx.lineTo(cx + 4, cy2 - 2);
    ctx.lineTo(cx, cy2);
    ctx.lineTo(cx - 4, cy2 - 2);
    ctx.closePath();
    ctx.fill();
  }

  // Sparkle
  const sparkle = Math.sin(time * 5 + c.bobOffset) * 0.5 + 0.5;
  ctx.fillStyle = `rgba(255,255,255,${sparkle * 0.8})`;
  ctx.fillRect(c.x + c.width / 2 - 1, y - 2, 2, 2);
}

function renderPlayer(ctx: CanvasRenderingContext2D, p: Player, time: number) {
  const dir = p.facing === 'right' ? 1 : -1;
  const cx = p.pos.x + p.width / 2;
  const cy = p.pos.y + p.height / 2;

  // Invincibility flash
  if (p.invincibleTimer > 0 && Math.floor(time * 10) % 2 === 0) return;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(dir, 1);

  // Body
  ctx.fillStyle = COLORS.playerBody;
  ctx.fillRect(-12, -8, 24, 24);

  // Outline
  ctx.strokeStyle = COLORS.playerOutline;
  ctx.lineWidth = 2;
  ctx.strokeRect(-12, -8, 24, 24);

  // Hat (pirate tricorn)
  ctx.fillStyle = COLORS.playerHat;
  ctx.beginPath();
  ctx.moveTo(-14, -8);
  ctx.lineTo(14, -8);
  ctx.lineTo(10, -20);
  ctx.lineTo(-2, -24);
  ctx.lineTo(-10, -18);
  ctx.closePath();
  ctx.fill();

  // Skull on hat
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-3, -18, 6, 5);
  ctx.fillRect(-1, -13, 2, 2);

  // Eyes
  ctx.fillStyle = COLORS.playerEyes;
  ctx.fillRect(2, -4, 6, 5);
  ctx.fillStyle = COLORS.playerPupil;
  ctx.fillRect(5, -3, 3, 3);

  // Whiskers (it's a cat!)
  ctx.strokeStyle = COLORS.playerOutline;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(12, 0);
  ctx.lineTo(20, -3);
  ctx.moveTo(12, 2);
  ctx.lineTo(20, 3);
  ctx.moveTo(12, 4);
  ctx.lineTo(18, 7);
  ctx.stroke();

  // Ears
  ctx.fillStyle = COLORS.playerBody;
  ctx.beginPath();
  ctx.moveTo(-8, -8);
  ctx.lineTo(-12, -16);
  ctx.lineTo(-4, -10);
  ctx.fill();

  // Legs (animated)
  const legAnim = p.onGround ? Math.sin(time * 10) * 3 : 4;
  ctx.fillStyle = COLORS.playerOutline;
  ctx.fillRect(-8, 16, 6, 6 + (p.onGround ? legAnim : 0));
  ctx.fillRect(2, 16, 6, 6 - (p.onGround ? legAnim : 0));

  // Sword (when attacking)
  if (p.attacking) {
    const swordAngle = (1 - p.attackTimer / 0.3) * Math.PI * 0.6 - Math.PI * 0.3;
    ctx.save();
    ctx.translate(8, 0);
    ctx.rotate(swordAngle);
    ctx.fillStyle = COLORS.playerSword;
    ctx.fillRect(0, -2, 28, 4);
    ctx.fillStyle = COLORS.goldDark;
    ctx.fillRect(-2, -4, 6, 8);
    // Sword glow
    ctx.shadowColor = COLORS.swordGlow;
    ctx.shadowBlur = 8;
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(4, -1, 24, 2);
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  ctx.restore();
}

function renderEnemy(ctx: CanvasRenderingContext2D, e: Enemy, time: number) {
  const dir = e.facing === 'right' ? 1 : -1;
  const cx = e.x + e.width / 2;
  const cy = e.y + e.height / 2;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(dir, 1);

  if (e.type === 'soldier') {
    // Body
    ctx.fillStyle = COLORS.soldierBody;
    ctx.fillRect(-10, -10, 20, 28);
    // Head
    ctx.fillStyle = COLORS.soldierSkin;
    ctx.fillRect(-6, -18, 12, 10);
    // Helmet
    ctx.fillStyle = '#555';
    ctx.fillRect(-7, -22, 14, 6);
    // Eyes
    ctx.fillStyle = '#fff';
    ctx.fillRect(1, -16, 4, 3);
    ctx.fillStyle = '#000';
    ctx.fillRect(3, -15, 2, 2);
    // Sword
    ctx.fillStyle = '#aaa';
    ctx.fillRect(10, -6, 3, 20);
    // Legs
    const legAnim = Math.sin(time * 6 + e.x) * 2;
    ctx.fillStyle = COLORS.soldierBody;
    ctx.fillRect(-8, 18, 6, 6 + legAnim);
    ctx.fillRect(2, 18, 6, 6 - legAnim);
  } else {
    // Rat
    ctx.fillStyle = COLORS.ratBody;
    ctx.beginPath();
    ctx.ellipse(0, 2, e.width / 2, e.height / 3, 0, 0, Math.PI * 2);
    ctx.fill();
    // Head
    ctx.beginPath();
    ctx.ellipse(8, -4, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Eye
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(10, -6, 3, 2);
    // Tail
    ctx.strokeStyle = COLORS.ratBody;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-e.width / 2, 2);
    ctx.quadraticCurveTo(-e.width / 2 - 10, -8, -e.width / 2 - 5, -12);
    ctx.stroke();
  }

  ctx.restore();
}

export function renderHUD(ctx: CanvasRenderingContext2D, state: GameState, canvasW: number) {
  // Health bar
  ctx.fillStyle = COLORS.healthBarBg;
  ctx.fillRect(16, 16, 104, 16);
  ctx.fillStyle = COLORS.healthBar;
  const healthW = (state.player.health / state.player.maxHealth) * 100;
  ctx.fillRect(18, 18, healthW, 12);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  ctx.strokeRect(16, 16, 104, 16);

  // HP label
  ctx.fillStyle = '#fff';
  ctx.font = '8px "Press Start 2P", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('HP', 20, 28);

  // Score
  ctx.fillStyle = COLORS.gold;
  ctx.font = '10px "Press Start 2P", monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`SCORE: ${state.score}`, canvasW - 16, 28);

  // Lives
  ctx.fillStyle = COLORS.gemRed;
  ctx.textAlign = 'left';
  ctx.fillText(`LIVES: ${state.lives}`, 16, 48);
}
