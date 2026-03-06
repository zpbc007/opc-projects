import { useMemo } from 'react';
import { ViewModeConfig } from '../types/view-mode';

/**
 * Detect view mode from URL parameters.
 *
 * - ?detail=1: Card grid with hidden header, forced light theme, ratings shown
 * - default: Interactive card grid with search/sort controls
 */
export function useViewMode(): ViewModeConfig {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const detail = params.get('detail') === '1';

    if (detail) {
      return {
        mode: 'card',
        showHeader: false,
        showRating: true,
        forceLightTheme: true,
      };
    }

    return {
      mode: 'card',
      showHeader: true,
      showRating: true,
      forceLightTheme: false,
    };
  }, []);
}