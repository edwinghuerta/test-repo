import { DialogConfig } from './dialog-config';
import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';

export const DIALOG_CHILD = new InjectionToken('DialogChild');

export class DialogInjector implements Injector {
  private context: WeakMap<any, any>;

  constructor(
    private parent: Injector,
    childType: Type<any>,
    config: DialogConfig
  ) {
    this.context = new WeakMap<any, any>([
      [DIALOG_CHILD, childType],
      [DialogConfig, config],
    ]);
  }

  set<T>(token: Type<T> | InjectionToken<T>, value: T) {
    this.context.set(token, value);
  }

  get<T>(
    token: Type<T> | InjectionToken<T>,
    defaultValue?: T,
    flags?: InjectFlags
  ): T {
    return this.context.get(token) || this.parent.get<any>(token, defaultValue);
  }
}
