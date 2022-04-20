import { ListComponent } from './../list/list.component';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Action, ListParams } from 'src/app/core/types/general.types';

import { CardData, CardMode } from '../card/card.component';
import { TabComponent, TabInterface } from '../tabs/tab.component';
import { AppService } from './../../../app.service';

@Component({
  selector: 'resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent implements OnInit, OnDestroy {
  @ViewChild(ListComponent) list: ListComponent;

  @Output() onload: EventEmitter<any> = new EventEmitter();
  @Output() onitemclick: EventEmitter<CardData> = new EventEmitter();
  @Output() onaction: EventEmitter<{
    action: Action;
    cards?: CardData[];
  }> = new EventEmitter();

  @Input() defaultActions = true;
  @Input() actions: Action[] = [];
  @Input() tabs: TabInterface[] = [];
  @Input() mode: CardMode = 'extended';
  @Input() cards: CardData[] = [];
  @Input() selectable: boolean;

  flags: string[] = ['search-hidden'];
  params: ListParams = {};
  appsub: Subscription;
  navsub: Subscription;

  constructor(private app: AppService) {
    if (!this.app?.header) this.app.header = {};
    if (!this.app.header.actions) this.app.header.actions = [];
  }

  ngOnInit(): void {
    this.navsub = this.app.navend.subscribe((e) => {
      const { search = '' } = e.queryParams || {};
      if (search) {
        this.flags = this.flags.filter((f) => f !== 'search-hidden');
        this.params.search = search;
        this.load();
      }
    });
    this.appsub = this.app.events
      .pipe(filter((e) => e.type === 'resource'))
      .subscribe(({ data }) => {
        if (data === 'toggle-search') this.toggleFlag('search-hidden');
      });

    if (this.defaultActions) {
      if (!this.app.header.actions.some((a) => a.code === 'create'))
        this.app.header.actions.push({ code: 'create', icon: 'fal fa-plus' });
    }
    if (!this.app.header.actions.some((a) => a.code === 'search'))
      this.app.header.actions.push({
        code: 'search',
        icon: 'fal fa-search',
        data: { type: 'resource', data: 'toggle-search' },
      });
  }

  ngOnDestroy(): void {
    this.navsub.unsubscribe();
    this.appsub.unsubscribe();
  }

  load() {
    this.onload.emit(this.params);
  }

  toggleFlag(flag: string) {
    const index = this.flags.findIndex((f) => f === flag);
    if (index === -1) this.flags.push(flag);
    else this.flags.splice(index, 1);
  }

  onTab(tab: TabComponent) {
    this.params.filters = tab?.value || {};
    this.load();
  }

  actionHandler(action: Action, cards: CardData[] = []) {
    this.onaction.emit({ action, cards });
  }

  print() {
    this.list.print();
  }
}
