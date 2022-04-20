import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { lockUI, unlockUI } from 'src/app/core/helpers/ui.helpers';
import { ReceiptsService } from 'src/app/core/services/receipts.service';
import { Action, ListParams } from 'src/app/core/types/general.types';
import { CardData } from 'src/app/shared/components/card/card.component';
import { ResourceListComponent } from 'src/app/shared/components/resource-list/resource-list.component';

@Component({
  selector: 'app-partner-receipts',
  templateUrl: './partner-receipts.component.html',
  styleUrls: ['./partner-receipts.component.scss'],
})
export class PartnerReceiptsComponent implements OnDestroy {
  @ViewChild(ResourceListComponent) list: ResourceListComponent;

  private navsub: Subscription;
  private appsub: Subscription;

  partnerId: string;
  cards: CardData[] = [];
  params: ListParams = {};
  totalToCollect = 0;
  totalCollected = 0;

  constructor(private receipts: ReceiptsService, private app: AppService) {
    this.app.header.actions = [{ code: 'download', icon: 'fad fa-download' }];
    this.navsub = this.app.navend.subscribe((e) => {
      // tslint:disable-next-line: no-string-literal
      const { url } = e['_routerState'];
      if (e?.params?.id && url.match(/partner/gim)) {
        this.partnerId = e?.params?.id;
        this.load();
      }
    });
    this.appsub = this.app.events
      .pipe(filter((e) => e.type === 'action'))
      .subscribe((e) => this.actionHandler(e.data));
  }

  async load(params: ListParams = this.params) {
    this.params = params;
    const promise = this.receipts.receiptsByPartner(
      this.partnerId,
      this.params
    );
    lockUI(promise);
    const items = await promise;
    this.cards = items.map((t) => t.toCard('as-partner'));
    this.totalCollected = 0;
    this.totalToCollect = 0;
    for (const item of items || []) {
      if (item.collected) this.totalCollected += item.communityProfit;
      else this.totalToCollect += item.communityProfit;
    }
  }

  async actionHandler(action: Action, cards: CardData[] = []) {
    lockUI();
    switch (action.code) {
      case 'download':
        this.list.print();
        break;
    }
    unlockUI();
  }

  ngOnDestroy() {
    this.navsub?.unsubscribe();
    this.appsub?.unsubscribe();
  }
}
