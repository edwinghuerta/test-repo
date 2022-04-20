import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesPanelService {
  
  @Output() changeCategory = new EventEmitter()

  constructor() { }

  getCategoryStatus(category)
  {
    this.changeCategory.emit(category);
  }
}
