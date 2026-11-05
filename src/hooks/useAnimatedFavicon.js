import { useEffect } from 'react';

/**
 * Хук для статического управления фавиконом SoftGreat AI.
 * Динамическая анимация вращения отключена.
 */
export function useAnimatedFavicon() {
  useEffect(() => {
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.href = '/favicon.png?v=4';
    }
  }, []);
}
