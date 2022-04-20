import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { OnsCarouselElement } from 'onsenui';
import { filter } from 'rxjs/operators';
import { Session } from 'src/app/core/models/session';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UiService } from './../../../core/services/ui.service';

import { UserForm } from './../../../core/models/user';
import { DialogService } from './../../../libs/dialog/services/dialog.service';
import { DialogRef } from './../../../libs/dialog/types/dialog-ref';
import { FormDialog } from './../form/form.dialog';
import { Action } from 'src/app/core/types/general.types';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth.dialog.html',
  styleUrls: ['./auth.dialog.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class AuthDialog implements AfterViewChecked {
  @ViewChild('carousel') carousel: ElementRef<OnsCarouselElement>;
  user: User;
  actions: Action[];
  showPassword: boolean;
  countryCode: string = "+1";
  private session: Session;  
  private phone: string;

  constructor(
    public ref: DialogRef,
    public auth: AuthService,
    public dialog: DialogService,
    private ui: UiService
  ) {
    this.actions = [
      {
        code: 'usa-code',
        image: '',
        text: 'USA',
        visible: (metadata: any) => !metadata?.multiple,
      },
      {
        code: 'rd-code',
        image: '',
        text: 'RD',
        visible: (metadata: any) => !metadata?.multiple,
      },
      {
        code: 'mx-code',
        image: '',
        text: 'MX',
        visible: (metadata: any) => !metadata?.multiple,
      }
    ];
  }

  async selectCountryCode() {
    const selected = await this.ui.actions(this.actions, ['no-search']);
    if(selected) {
      switch(selected.code) {
        case 'usa-code':
          this.countryCode = "+1";
          break
        case 'rd-code':
          this.countryCode = "+1";
          break
        case 'mx-code':
          this.countryCode = "+52"
      }
    }
  }

  async enterUser(phone: string) {    
    this.phone = `${this.countryCode}${phone}`;
    const exists = await this.auth.userExist(this.phone);
    if (!exists) {
      this.user = await this.auth.signup({ phone: this.phone });
      if (this.user) this.carousel?.nativeElement?.setActiveIndex(1);
    } else {
      this.carousel?.nativeElement?.setActiveIndex(2);
    }
  }

  async enterCode(code: string) {
    if (this.user) this.session = await this.auth.verify(code, this.user._id);
    if (this.session) this.carousel?.nativeElement?.setActiveIndex(2);
  }

  async enterPassword(password: string) {
    try {
      const isSignup = !!this.user;
      if (isSignup) this.user = await this.auth.updateMe({ password });
      // else this.session = await this.auth.signin(this.phone, password);
    } catch (e) {}
    if (this.session) this.ref.close(this.session);
  }

  async moreInfo() {
    const userForm = new UserForm('', {});
    delete userForm.controls?.phone;
    const dialogref = this.dialog.open(FormDialog, {
      type: 'action-sheet',
      props: {
        withImage: true,
        form: userForm,
      },
    });
    const sub = dialogref.events
      .pipe(filter((e) => e.type === 'result'))
      .subscribe((e) => {
        if (e.data) this.auth.updateMe(e.data);
        sub.unsubscribe();
      });
  }

  validateInput(input: HTMLInputElement) {
    const type = input.getAttribute('data-type') || 'text';
    switch (type) {
      case 'number':
        input.value = input.value?.replace(/[^0-9]/gim, '') || '';
        break;
    }
  }

  ngAfterViewChecked() {
    const index: number = this.carousel.nativeElement.getActiveIndex() as any;
    this.ref.blocked = !!index && !!this.user;
  }
}
