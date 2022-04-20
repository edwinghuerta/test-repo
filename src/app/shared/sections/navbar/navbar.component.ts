import { Subscription } from 'rxjs';
import { AppService } from './../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { filter } from 'rxjs/operators';

export interface NavLink {
  icon: string;
  link: string;
  title?: string;
  badge?: string;
}

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @Input()
  withoutHome = false;

  current: NavLink;
  navsub: Subscription;
  appsub: Subscription;

  constructor(private route: ActivatedRoute, public app: AppService) {
    this.navsub = this.app.navend.subscribe(() => this.activeByUrl());
    this.appsub = this.app.events
      .pipe(filter((e) => e.type === 'refresh'))
      .subscribe(() => this.activeByUrl());
  }

  ngAfterViewInit() {
    this.activeByUrl();
  }

  ngOnDestroy(): void {
    this.navsub?.unsubscribe();
    this.appsub?.unsubscribe();
  }

  activeByUrl() {
    const state = ((this.route.snapshot || {}) as any)._routerState;
    const url: string = (state?.url || '/').replace(/\?+$/im, '');
    this.current = this.app?.nav?.find((tab) => tab.link === url);
  }

  @HostBinding('class.hidden')
  get hidden() {
    return this.app?.nav?.length <= 0;
  }
}
