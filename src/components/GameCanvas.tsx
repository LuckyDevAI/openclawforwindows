import { useEffect, useRef, useCallback } from 'react';
import { GameState } from '@/game/types';
import { createInitialState, updateGame } from '@/game/engine';
import { renderGame, renderHUD } from '@/game/renderer';

const CANVAS_W = 800;
const CANVAS_H = 600;

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createInitialState());
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const s = stateRef.current;
    s.keys.add(e.key);

    if (s.gameStatus === 'menu' && (e.key === 'Enter' || e.key === ' ')) {
      s.gameStatus = 'playing';
    }
    if ((s.gameStatus === 'gameover' || s.gameStatus === 'win') && e.key === 'Enter') {
      stateRef.current = createInitialState();
      stateRef.current.gameStatus = 'playing';
    }
    if (e.key === 'z' || e.key === 'x') {
      if (!s.player.attacking && s.gameStatus === 'playing') {
        s.player.attacking = true;
        s.player.attackTimer = 0.3;
      }
    }

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault();
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    stateRef.current.keys.delete(e.key);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const loop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;

      stateRef.current = updateGame(stateRef.current, dt);

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      const s = stateRef.current;

      if (s.gameStatus === 'menu') {
        renderMenuScreen(ctx);
      } else if (s.gameStatus === 'playing') {
        renderGame(ctx, s, CANVAS_W, CANVAS_H);
        renderHUD(ctx, s, CANVAS_W);
      } else if (s.gameStatus === 'gameover') {
        renderGame(ctx, s, CANVAS_W, CANVAS_H);
        renderHUD(ctx, s, CANVAS_W);
        renderGameOver(ctx);
      } else if (s.gameStatus === 'win') {
        renderGame(ctx, s, CANVAS_W, CANVAS_H);
        renderHUD(ctx, s, CANVAS_W);
        renderWinScreen(ctx, s.score);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl text-primary font-pixel tracking-wider">
        ⚔ OpenClaw ⚔
      </h1>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="border-2 border-primary rounded-sm shadow-[0_0_30px_rgba(241,196,15,0.3)]"
        tabIndex={0}
      />
      <div className="text-xs text-muted-foreground font-pixel text-center space-y-1">
        <p>Arrow Keys / WASD — Move & Jump</p>
        <p>Z or X — Attack</p>
      </div>
    </div>
  );
}

function renderMenuScreen(ctx: CanvasRenderingContext2D) {
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 600);
  grad.addColorStop(0, '#0a1628');
  grad.addColorStop(1, '#1a3a5c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 600);

  // Title
  ctx.fillStyle = '#f1c40f';
  ctx.font = '36px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#d4a017';
  ctx.shadowBlur = 20;
  ctx.fillText('OPENCLAW', 400, 180);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#e74c3c';
  ctx.font = '12px "Press Start 2P", monospace';
  ctx.fillText('Captain Claw Tribute', 400, 230);

  // Pirate cat ASCII art (simple)
  ctx.fillStyle = '#d4a030';
  ctx.font = '14px monospace';
  const cat = [
    '  /\\_/\\  ',
    ' ( o.o ) ',
    '  > ^ <  ',
    ' /|   |\\⚔',
  ];
  cat.forEach((line, i) => {
    ctx.fillText(line, 400, 290 + i * 22);
  });

  // Instructions
  ctx.fillStyle = '#ffffff';
  ctx.font = '11px "Press Start 2P", monospace';
  const blink = Math.sin(Date.now() / 400) > 0;
  if (blink) {
    ctx.fillText('PRESS ENTER TO START', 400, 440);
  }

  ctx.fillStyle = '#888';
  ctx.font = '8px "Press Start 2P", monospace';
  ctx.fillText('Arrow Keys / WASD — Move', 400, 500);
  ctx.fillText('Z or X — Sword Attack', 400, 520);
  ctx.fillText('Collect Gems & Defeat Enemies!', 400, 540);

  // Re-trigger render for blink
  requestAnimationFrame(() => {});
}

function renderGameOver(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, 0, 800, 600);

  ctx.fillStyle = '#e74c3c';
  ctx.font = '28px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#c0392b';
  ctx.shadowBlur = 15;
  ctx.fillText('GAME OVER', 400, 270);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#fff';
  ctx.font = '10px "Press Start 2P", monospace';
  const blink = Math.sin(Date.now() / 400) > 0;
  if (blink) ctx.fillText('PRESS ENTER TO RETRY', 400, 340);
}

function renderWinScreen(ctx: CanvasRenderingContext2D, score: number) {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, 800, 600);

  ctx.fillStyle = '#f1c40f';
  ctx.font = '24px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#d4a017';
  ctx.shadowBlur = 20;
  ctx.fillText('LEVEL COMPLETE!', 400, 250);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#fff';
  ctx.font = '14px "Press Start 2P", monospace';
  ctx.fillText(`SCORE: ${score}`, 400, 310);

  ctx.font = '10px "Press Start 2P", monospace';
  const blink = Math.sin(Date.now() / 400) > 0;
  if (blink) ctx.fillText('PRESS ENTER TO PLAY AGAIN', 400, 380);
}
