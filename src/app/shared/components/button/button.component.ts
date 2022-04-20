import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { ThemeColor } from './../../../core/types/general.types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @HostBinding('attr.type')
  @Input()
  type: 'icon' | 'rounded' | 'flat' = 'rounded';

  @Input() color: ThemeColor = 'light';

  @Input() link?: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  @HostBinding('class')
  get classes(): string {
    return `color-${this.color}`;
  }

  @HostListener('click')
  click() {
    if (this.link) this.router.navigateByUrl(this.link);
  }
}
