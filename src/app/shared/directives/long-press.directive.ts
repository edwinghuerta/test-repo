import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { platform } from 'onsenui';

@Directive({
  selector: '[longPress]',
})
export class LongPressDirective {
  @Input('longPress') time = 2;
  @Output() longpressed: EventEmitter<any> = new EventEmitter();

  private timeout: any;

  constructor() {}

  @HostListener('mousedown')
  @HostListener('pointerdown')
  onMousedown() {
    if (!this.timeout) {
      const time = this.time * 1000;
      this.timeout = setTimeout(() => this.longpressed.emit(), time);
    }
  }

  @HostListener('mouseup')
  @HostListener('pointerout')
  onMouseup() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }
}
