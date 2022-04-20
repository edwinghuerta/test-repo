import { filter } from 'rxjs/operators';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { CardData } from '../card/card.component';
import { Action, ListParams } from './../../../core/types/general.types';
import { CardComponent, CardMode } from './../card/card.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('cardsAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ transform: 'translateX(-6rem)', opacity: 0 }),
            stagger(120, [
              animate(
                '0.3s ease-in-out',
                style({ transform: 'translateX(0)', opacity: 1 })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ListComponent {
  array: CardData[] = [];

  @ViewChild('printbtn')
  private printbtn: ElementRef<HTMLButtonElement>;

  @ViewChildren(CardComponent)
  cards: QueryList<CardComponent>;

  @Input() title: string;
  @Input() icon: string;

  @Input() mode: CardMode = 'extended';
  @Input() actions: Action[];

  @Input() selectable = false;
  @Input() clickeable = false;

  @HostBinding('class.selection')
  @Input()
  selectionActive = false;

  @Output()
  onitemclick: EventEmitter<CardData> = new EventEmitter();

  @Output()
  onaction: EventEmitter<{
    action: Action;
    cards?: CardData[];
  }> = new EventEmitter();

  constructor() {}

  @Input()
  set items(arr: CardData[]) {
    this.selectionActive = false;
    this.array = arr;
  }

  visibleAction(action: Action) {
    const visible = action.visible
      ? action.visible({ multiple: this.selectionActive })
      : true;
    const onlyselection = (action.flags || []).includes('only-selection');
    const selectionable = onlyselection && !this.selectionActive;
    return visible && selectionable;
  }

  exitSelection() {
    this.selectionActive = false;
    this.cards.forEach((c) => (c.selected = false));
  }

  selectAll(selected: boolean) {
    this.cards.forEach((c) => (c.selected = selected));
  }

  emitAction(action: Action, cards?: CardData[]) {
    if (this.selectionActive)
      cards = this.cards.filter((c) => c.selected).map((c) => c.data);
    this.onaction.emit({ action, cards });
  }

  public print() {
    this.printbtn?.nativeElement?.click();
  }

  get cardActions() {
    return this.actions.filter(
      (a) => !(a.flags || []).includes('only-selection')
    );
  }
}
