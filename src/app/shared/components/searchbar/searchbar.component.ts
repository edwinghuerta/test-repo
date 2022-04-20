import {
  Component,
  EventEmitter,
  Output,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { timeStamp } from 'console';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchbarComponent),
      multi: true,
    },
  ],
})
export class SearchbarComponent implements ControlValueAccessor {
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Input() disabled: boolean;

  text: string;
  onChange = (_: any) => {};
  onTouch = (_: any) => {};

  constructor() {}

  emit() {
    this.search.emit(this.text);
  }

  @Input()
  set value(value: string) {
    this.text = value;
    this.onChange(this.text);
  }

  get value() {
    return this.text;
  }

  writeValue(value: string): void {
    this.text = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
