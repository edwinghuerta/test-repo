import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Action } from './../../../core/types/general.types';

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent {
  @Output() imageClick: EventEmitter<MouseEvent> = new EventEmitter();
  @Input() image?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() backLink = true;

  constructor(private router: Router, public location: Location) {}

  onAction(action: Action) {
    let url: string;
    switch (action.code) {
      case 'NOTIFICATIONS':
        url = '/notifications';
        break;
    }
    this.router.navigateByUrl(url);
  }
}
