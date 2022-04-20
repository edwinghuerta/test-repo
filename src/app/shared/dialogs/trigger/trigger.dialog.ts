import { Component, OnInit, Input } from '@angular/core';
import { DialogRef } from 'src/app/libs/dialog/types/dialog-ref';

@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.dialog.html',
  styleUrls: ['./trigger.dialog.scss']
})
// tslint:disable-next-line: component-class-suffix
export class TriggerDialog implements OnInit {

  @Input() url: string;

  constructor(public ref: DialogRef) { }

  ngOnInit(): void {
  }

}