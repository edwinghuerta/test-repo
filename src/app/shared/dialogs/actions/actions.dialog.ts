import { Component, Input, HostBinding } from '@angular/core';
import { Action } from 'src/app/core/types/general.types';
import { DialogRef } from 'src/app/libs/dialog/types/dialog-ref';

@Component({
  selector: 'app-actions-dialog',
  templateUrl: './actions.dialog.html',
  styleUrls: ['./actions.dialog.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ActionsDialog {
  @Input() actions: Action[] = [];
  @Input() flags: string[] = [];
  search = '';

  @HostBinding('class')
  get classes() {
    const classes: string[] = [].concat(this.flags || []);
    return classes.reduce((p, c) => `${p} ${c}`, '');
  }

  constructor(public ref: DialogRef) {}

  select(action: Action) {
    this.ref.close(action);
  }

  get filtereds() {
    if (!this.search) return this.actions;
    return this.actions.filter((a) =>
      a.text?.match(RegExp(this.search, 'igm'))
    );
  }

  hasAnyFlag(...flags: string[]) {
    return this.flags.some((f) => flags.includes(f));
  }
}
