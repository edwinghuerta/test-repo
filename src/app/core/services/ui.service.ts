import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Action } from 'src/app/core/types/general.types';

import { DialogService } from './../../libs/dialog/services/dialog.service';
import { ActionsDialog } from './../../shared/dialogs/actions/actions.dialog';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private auth: AuthService, private dialog: DialogService) {}

  public async actions(actions: Action[], flags: string[] = []) {
    const ref = this.dialog.open(ActionsDialog, {
      type: 'action-sheet',
      flags: ['no-header'],
      props: { actions, flags },
      customClass: 'app-dialog',
    });
    return new Promise<Action>((resolve) => {
      const sub = ref.events
        .pipe(filter((e) => e.type === 'result'))
        .subscribe((e) => {
          resolve(e?.data);
          sub.unsubscribe();
        });
    });
  }
}
