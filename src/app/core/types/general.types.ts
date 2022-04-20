export type ThemeColor =
  | 'primary'
  | 'dark'
  | 'light'
  | 'gray'
  | 'info'
  | 'danger'
  | 'success';

export interface Action<T = any> {
  code?: string;
  icon?: string;
  text?: string;
  image?: string;
  color?: ThemeColor;
  data?: T;
  link?: string;
  flags?: string[];
  visible?: (...args: any[]) => boolean;
}

export interface ListParams {
  search?: string;
  sort?: Record<string, number>;
  filters?: Record<string, any>;
}
