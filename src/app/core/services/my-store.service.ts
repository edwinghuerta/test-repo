import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class MyStoreService {
  activites = ['my-store'];
  mode = 'normal';
  constructor() {}
}
