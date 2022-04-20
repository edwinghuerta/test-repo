import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

import { UiService } from './../../../core/services/ui.service';
import { Action, ThemeColor } from './../../../core/types/general.types';

export interface CardData {
  image?: string;
  title?: string;
  content?: string;
  accent?: {
    content?: string;
    color?: ThemeColor;
    emit?: boolean;
  };
  metadata?: Record<string, any>;
}

export type CardMode = 'minimal' | 'extended';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @HostBinding('attr.mode')
  @Input()
  mode: CardMode = 'extended';

  @HostBinding('class.selection')
  @Input()
  selectionControl: boolean;

  @Input()
  data: CardData = {};

  @Input()
  actions: Action[] = [];

  @Input()
  clickeable: boolean;

  @Input()
  selected: any;

  @Output()
  onaction: EventEmitter<Action> = new EventEmitter();

  @HostBinding('class.no-image')
  get noimage() {
    return !this.data?.image;
  }

  constructor(private ui: UiService) {}

  onClick(event: Event) {
    if (this.selectionControl) {
      this.selected = !this.selected;
      event?.stopImmediatePropagation();
    }
  }

  async showActions() {
    const actions = this.actions.filter((a) =>
      a?.visible ? a.visible() : true
    );
    const selected = await this.ui.actions(actions, ['no-search']);
    if (selected) this.onaction.emit(selected);
  }

  accentClick(event: Event) {
    if (!this.selectionControl && this.data.accent?.emit) {
      this.onaction.emit({ code: '__accent__' });
      event.stopPropagation();
    }
  }
}
