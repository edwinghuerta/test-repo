import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

export interface TabInterface {
  code: string;
  title?: string;
  value?: any;
  active?: boolean;
}

@Component({
  selector: 'tab',
  template: `
    <ng-template #template>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class TabComponent implements TabInterface {
  @ViewChild('template') public tmpl: TemplateRef<any>;
  @Input() code: string;
  @Input() active: boolean;
  @Input() title?: string;
  @Input() image?: string;
  @Input() link?: string;
  @Input() value?: any;

  constructor(private router: Router) {}

  public click(toogleActive = true) {
    if (toogleActive) this.active = !this.active;
    if (this.active && this.link) this.router.navigateByUrl(this.link);
  }
}
