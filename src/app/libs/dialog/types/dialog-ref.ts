import { ApplicationRef, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { DialogComponent } from './../components/dialog/dialog.component';
import { DialogEvent } from './dialog-events';

export class DialogRef {
  public readonly events: Observable<DialogEvent>;
  private emiter: Subject<DialogEvent>;

  constructor(
    private appRef: ApplicationRef,
    private dref: ComponentRef<DialogComponent>
  ) {
    this.emiter = new Subject();
    this.events = this.emiter.asObservable();
    this.emiter.next({ type: 'before-open' });
    const sub = this.dref?.instance?.closed?.subscribe((result: any) => {
      this.resolve(result);
      sub.unsubscribe();
    });
    this.attach();
  }

  public get component() {
    return this.dref?.instance?.child;
  }

  public set blocked(value: boolean) {
    if (this.dref?.instance) this.dref.instance.cancellable = !value;
  }

  public get blocked() {
    return this.dref?.instance?.cancellable;
  }

  public emit(data: any) {
    this.emiter.next({ type: 'custom', data });
  }

  public close(result?: any) {
    const dialog: DialogComponent = this.dref?.instance;
    this.emiter.next({ type: 'before-close' });
    dialog.close(result);
  }

  private resolve(result?: any) {
    this.emiter.next({ type: 'result', data: result });
    this.deattach();
  }

  private attach() {
    const viewRef = this.dref.hostView as EmbeddedViewRef<any>;
    this.appRef.attachView(viewRef);
    document.body.appendChild(viewRef.rootNodes[0]);
    this.emiter.next({ type: 'after-open' });
  }

  private deattach() {
    this.appRef.detachView(this.dref.hostView as EmbeddedViewRef<any>);
    this.dref.destroy();
    this.emiter.next({ type: 'after-close' });
  }
}
