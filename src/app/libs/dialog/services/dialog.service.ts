import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Type,
} from '@angular/core';

import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogModule } from '../dialog.module';
import { DialogConfig } from '../types/dialog-config';
import { DialogInjector } from '../types/dialog-injector';
import { DialogRef } from '../types/dialog-ref';

@Injectable({ providedIn: DialogModule })
export class DialogService {
  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private factory: ComponentFactoryResolver
  ) {}

  public open(type: Type<any>, config: DialogConfig = {}): DialogRef {
    const factory = this.factory.resolveComponentFactory(DialogComponent);
    const injector = new DialogInjector(this.injector, type, config);
    const dialog = factory.create(injector);
    const ref = new DialogRef(this.appRef, dialog);
    injector.set(DialogRef, ref);
    return ref;
  }
}
