import { useEffect } from 'react';

/**
 * Хук для плавной анимации фирменной звезды SFTG AI в фавиконе вкладки браузера через Canvas.
 * 
 * Параметры:
 * - Цикл 8 секунд (длинная пауза покоя, без мелькания).
 * - Строгий квадрат со скруглением r=2px (32x32px).
 * - Спит в фоне при неактивной вкладке (document.hidden).
 */
export function useAnimatedFavicon() {
  useEffect(() => {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    const originalHref = link.href || '/favicon.png?v=2';

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let startTime = performance.now();
    const CYCLE_MS = 8000;

    function roundRect(ctx, x, y, width, height, radius, fillStyle) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + width, y, x + width, y + height, radius);
      ctx.arcTo(x + width, y + height, x, y + height, radius);
      ctx.arcTo(x, y + height, x, y, radius);
      ctx.arcTo(x, y, x + width, y, radius);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }

    function drawStar(ctx, cx, cy, arm, scale, rotationDeg) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((rotationDeg * Math.PI) / 180);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.moveTo(0, -arm);
      ctx.quadraticCurveTo(0, 0, arm, 0);
      ctx.quadraticCurveTo(0, 0, 0, arm);
      ctx.quadraticCurveTo(0, 0, -arm, 0);
      ctx.quadraticCurveTo(0, 0, 0, -arm);
      ctx.closePath();

      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();
    }

    function render(now) {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTime) % CYCLE_MS;
      const progress = elapsed / CYCLE_MS;

      let scale = 1;
      let rot = 0;

      if (progress < 0.75) {
        scale = 1;
        rot = 0;
      } else if (progress < 0.80) {
        const t = (progress - 0.75) / 0.05;
        scale = 1 - 0.35 * t;
        rot = -15 * t;
      } else if (progress < 0.90) {
        const t = (progress - 0.80) / 0.10;
        scale = 0.65 + (1.15 - 0.65) * Math.sin(t * (Math.PI / 2));
        rot = -15 + (375 - (-15)) * t;
      } else if (progress < 0.95) {
        const t = (progress - 0.90) / 0.05;
        scale = 1.15 - 0.18 * t;
        rot = 375 - 17 * t;
      } else {
        const t = (progress - 0.95) / 0.05;
        scale = 0.97 + 0.03 * t;
        rot = 358 + 2 * t;
      }

      ctx.clearRect(0, 0, 32, 32);

      // Строгий квадрат с едва заметным скруглением 2px
      roundRect(ctx, 0, 0, 32, 32, 2.5, '#2997D8');

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 6.5px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText('S', 8, 8.5);
      ctx.fillText('F', 24, 8.5);
      ctx.fillText('T', 8, 24);
      ctx.fillText('G', 24, 24);

      drawStar(ctx, 16, 16, 10.5, scale, rot);

      link.href = canvas.toDataURL('image/png');

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      link.href = originalHref;
    };
  }, []);
}
