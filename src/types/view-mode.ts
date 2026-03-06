export type ViewMode = 'card' | 'table';

export interface ViewModeConfig {
  mode: ViewMode;
  showHeader: boolean;
  showRating: boolean;
  forceLightTheme: boolean;
}