export type DialogEventType =
  | 'before-open'
  | 'after-open'
  | 'before-close'
  | 'after-close'
  | 'custom'
  | 'result';

export interface DialogEvent {
  type: DialogEventType;
  data?: any;
}
