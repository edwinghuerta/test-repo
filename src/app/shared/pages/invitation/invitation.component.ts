import { AuthService } from './../../../core/services/auth.service';
import { UiService } from './../../../core/services/ui.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Community } from 'src/app/core/models/community';

import { AppService } from './../../../app.service';
import { CommunitiesService } from './../../../core/services/communities.service';
import { User } from 'src/app/core/models/user';
import { notification } from 'onsenui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent implements OnDestroy {
  private navsub: Subscription;
  private identifier: string;
  private email: string;
  private community: Community;

  constructor(
    private ui: UiService,
    private router: Router,
    private app: AppService,
    private auth: AuthService,
    private communities: CommunitiesService
  ) {
    this.navsub = this.app.navend.subscribe((e) => {
      const { identifier } = e?.params || {};
      if(e?.queryParams.email) this.email = e?.queryParams.email || null;
      this.identifier = identifier;
      if (this.identifier) this.load();
    });
  }

  async load() {
    await this.auth.ready.toPromise();
    let id: string;
    const isKindcode = !!this.identifier?.match(/^[$#]/);
    if (!isKindcode) id = this.identifier;
    this.community = await this.communities.community(id);
    if (this.auth?.session?.user) await this.evalUser();
    // else await this.openDialog();
  }

  // async openDialog() {
  //   const result = await this.ui.authDialog(true);
  //   if (result) await this.evalUser();
  // }

  async evalUser() {
    const user = this.auth?.session?.user;
    if (user?.defaultCommunity?._id) {
      let update: boolean;
      const uc = user?.defaultCommunity;
      const same = uc._id === this.community._id;
      if (same) await notification.alert('This is already your default hive');
      else {
        const response = await notification.confirm(
          `Your default community is '${uc?.kindcode}', do you really want to change it for '${this.community.kindcode}'?`,
          { buttonLabels: ['No', 'Yes'], primaryButtonIndex: 2 }
        );
        if (response) update = true;
      }
      if(this.email) {
        const response = await notification.confirm(
          `Are you sure that you want to update your email to '${this.email}'?`,
          { buttonLabels: ['No', 'Yes'], primaryButtonIndex: 2 }
        );
        if(!response) this.email = null;
      }
      await this.resolve(update);
    } else await this.resolve(true);
  }

  async resolve(update?: boolean) {
    if (update) {
      let body: any;
      if(this.email) {
        body = {
          defaultCommunity: this.community?._id,
          email: this.email
        }
      } else {
        body = {
          defaultCommunity: this.community?._id
        }
      }
      await this.auth.updateMe(body);
    } else {
      if(this.email) {
        const body = {
          email: this.email
        }
        await this.auth.updateMe(body);
      }
    }
    await this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.navsub?.unsubscribe();
  }
}
