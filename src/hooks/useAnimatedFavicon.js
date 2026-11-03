import { useEffect } from 'react';

/**
 * Хук для плавной анимации фирменной звезды SFTG AI в фавиконе вкладки браузера через Canvas.
 * 
 * Особенности:
 * - Размер 32x32 px.
 * - Полностью синхронизирован с циклом в 6 секунд (70% покой, затем замах, спин и поп).
 * - Оптимизация: когда вкладка не активна (document.hidden), анимация спит и не тратит батарею.
 */
export function useAnimatedFavicon() {
  useEffect(() => {
    // Находим или создаем <link rel="icon">
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
    const CYCLE_MS = 6000;

    // Вспомогательная функция рисования скругленного прямоугольника
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

    // Рисование 4-лучевой звезды
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

      // Маленькая круглая точка в центре для резкости
      ctx.beginPath();
      ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();
    }

    function render(now) {
      // Если вкладка скрыта — не нагружаем CPU
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTime) % CYCLE_MS;
      const progress = elapsed / CYCLE_MS; // 0..1

      let scale = 1;
      let rot = 0;

      if (progress < 0.70) {
        // Покой
        scale = 1;
        rot = 0;
      } else if (progress < 0.76) {
        // Замах и сжатие
        const t = (progress - 0.70) / 0.06;
        scale = 1 - 0.38 * t; // 1 -> 0.62
        rot = -15 * t; // 0 -> -15 deg
      } else if (progress < 0.88) {
        // Энергичный перекрут и вытягивание
        const t = (progress - 0.76) / 0.12;
        // easeOutBack-подобное вытягивание
        scale = 0.62 + (1.18 - 0.62) * Math.sin(t * (Math.PI / 2));
        rot = -15 + (375 - (-15)) * t;
      } else if (progress < 0.94) {
        // Отскок
        const t = (progress - 0.88) / 0.06;
        scale = 1.18 - 0.22 * t; // 1.18 -> 0.96
        rot = 375 - 17 * t; // 375 -> 358
      } else {
        // Возврат в покой
        const t = (progress - 0.94) / 0.06;
        scale = 0.96 + 0.04 * t; // 0.96 -> 1.0
        rot = 358 + 2 * t; // 358 -> 360
      }

      // Очистка холста
      ctx.clearRect(0, 0, 32, 32);

      // Фон синий скругленный квадрат
      roundRect(ctx, 0, 0, 32, 32, 7, '#2497D8');

      // Буквы S F T G (белые, жирные)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 6.5px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText('S', 8, 8.5);
      ctx.fillText('F', 24, 8.5);
      ctx.fillText('T', 8, 24);
      ctx.fillText('G', 24, 24);

      // Звезда в центре (cx=16, cy=16, arm=10)
      drawStar(ctx, 16, 16, 10.5, scale, rot);

      // Обновляем фавикон
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
