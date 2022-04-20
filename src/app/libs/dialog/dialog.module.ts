import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DialogComponent],
  entryComponents: [DialogComponent],
})
export class DialogModule {}
