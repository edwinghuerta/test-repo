export type DialogFlag = 'maximized' | 'locksize' | 'no-header';

export class DialogConfig<Props = Record<string, any>> {
  type?: 'window' | 'action-sheet' | 'top-action-sheet' | 'fullscreen' | 'flat-action-sheet';
  props?: Props;
  title?: string;
  flags?: DialogFlag[];
  customClass?: string;
  notCancellable?: boolean;
}
