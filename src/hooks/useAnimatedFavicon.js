import { useEffect } from 'react';

/**
 * Хук для плавной анимации фирменной звезды SFTG AI в фавиконе вкладки браузера через Canvas.
 * 
 * Оптимизация под Chrome:
 * - Цикл 6000 мс (как в первой версии).
 * - Ограничение частоты обновления фавикона до 15-20 FPS (интервал 50-60 мс) только во время фазы движения.
 * - В фазе покоя не спамит браузер обновлениями link.href, благодаря чему Chrome не троттлит и плавно отрисовывает все промежуточные кадры поворота.
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
    let lastUpdateMs = 0;
    let isResting = true;
    const CYCLE_MS = 6000;
    const FRAME_INTERVAL_MS = 50; // ~20 FPS — идеальная частота для Chrome favicon

    function roundRect(ctx, x, y, width, height, radius, fillStyle) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + width, y, x + width, y + height, radius);
      ctx.arcTo(x + width, y + height, x, y + height, radius);
      ctx.arcTo(x, y + height, x, y, radius);
      ctx.arcTo(x, y + width, y, radius);
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

    function drawFavicon(scale, rot) {
      ctx.clearRect(0, 0, 32, 32);

      // Строгий квадрат с едва заметным скруглением 2.5px
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
    }

    function render(now) {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTime) % CYCLE_MS;
      const progress = elapsed / CYCLE_MS;

      // 0..0.70 — фаза покоя (4.2 секунды)
      if (progress < 0.70) {
        if (!isResting) {
          isResting = true;
          drawFavicon(1, 0); // фиксируем статичный четкий кадр
        }
        animId = requestAnimationFrame(render);
        return;
      }

      // Начинается фаза движения (1.8 секунды)
      isResting = false;

      // Ограничиваем частоту смены link.href, чтобы Chrome успевал выводить каждый кадр без пропуска
      if (now - lastUpdateMs < FRAME_INTERVAL_MS) {
        animId = requestAnimationFrame(render);
        return;
      }
      lastUpdateMs = now;

      let scale = 1;
      let rot = 0;

      if (progress < 0.76) {
        // Замах и сжатие
        const t = (progress - 0.70) / 0.06;
        scale = 1 - 0.38 * t;
        rot = -15 * t;
      } else if (progress < 0.88) {
        // Энергичный перекрут и вытягивание
        const t = (progress - 0.76) / 0.12;
        scale = 0.62 + (1.18 - 0.62) * Math.sin(t * (Math.PI / 2));
        rot = -15 + (375 - (-15)) * t;
      } else if (progress < 0.94) {
        // Отскок
        const t = (progress - 0.88) / 0.06;
        scale = 1.18 - 0.22 * t;
        rot = 375 - 17 * t;
      } else {
        // Возврат в покой
        const t = (progress - 0.94) / 0.06;
        scale = 0.96 + 0.04 * t;
        rot = 358 + 2 * t;
      }

      drawFavicon(scale, rot);

      animId = requestAnimationFrame(render);
    }

    // Первый рендер
    drawFavicon(1, 0);
    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      link.href = originalHref;
    };
  }, []);
}
