import { useEffect } from 'react';

/**
 * Хук для статического управления фавиконом Softgreat AI.
 * Динамическая анимация вращения отключена для устранения мерцания во вкладке.
 */
export function useAnimatedFavicon() {
  useEffect(() => {
    // Устанавливаем статический SVG / PNG фавикон Softgreat AI
    const faviconSvg = document.querySelector("link[rel='icon'][type='image/svg+xml']");
    if (!faviconSvg) {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      link.href = '/favicon.svg';
      document.head.appendChild(link);
    }
  }, []);
}
