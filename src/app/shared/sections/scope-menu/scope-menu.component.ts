import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Component, HostBinding, Input, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

import { Merchant } from './../../../core/models/merchant';
import { CommunitiesService } from './../../../core/services/communities.service';
import { MerchantsService } from './../../../core/services/merchants.service';

function generator(seed = 'random', qty = 5) {
  const arr = [];
  for (let i = 0; i < qty; i++)
    arr.push(
      new Merchant({
        _id: i,
        image: `https://picsum.photos/seed/${seed}-${i}/200`,
        name: `Test (${i})`,
      } as any)
    );
  return arr;
}

@Component({
  selector: 'app-scope-menu',
  templateUrl: './scope-menu.component.html',
  styleUrls: ['./scope-menu.component.scss'],
})
export class ScopeMenuComponent implements OnDestroy {
  @HostBinding('class.shown')
  @Input()
  shown: boolean;
  merchants: Merchant[] = [];
  communities: any[] = [];
  private changesSub: Subscription;

  constructor(
    private app: AppService,
    public auth: AuthService,
    private communitiesService: CommunitiesService,
    private merchantsService: MerchantsService
  ) {
    this.changesSub = this.app.events
      .pipe(filter((e) => e.type === 'auth' || e.type === 'reload'))
      .subscribe(() => this.load());
    this.load();
  }

  async load() {
    if (this.auth?.session?.token) {
      this.merchants = await this.merchantsService.myMerchants();
      this.communities = await this.communitiesService.communities();
    }
  }

  ngOnDestroy() {
    this.changesSub?.unsubscribe();
    delete this.changesSub;
  }
}
