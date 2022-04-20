import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IllustrationService {
  public illustration: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor() {}

  selectIllustration(type: number) {
    if (type == 1) {
      let illustration = {
        type,
        line1: 'Hagamoslo',
        line2: 'de nuevo',
        showDecoration: true,
        background: '',
        backgroundTextType: 0,
        borderRadius: false,
        text: '',
      };
      this.illustration.next(illustration);
      
    }
  }

  setIllustration(illustration){
    this.illustration.next(illustration);
  }

  getIllustration() {
    return this.illustration.asObservable();
  }

  editLine1(text) {
    let previousIllustration = this.illustration.value;
    previousIllustration.line1 = text;
    this.illustration.next(previousIllustration);
  }

  editLine2(text) {
    let previousIllustration = this.illustration.value;
    previousIllustration.line2 = text;
    this.illustration.next(previousIllustration);
  }

  editBackground(image) {
    let previousIllustration = this.illustration.value;
    previousIllustration.background = image;
    this.illustration.next(previousIllustration);
  }

  editBackgroundTextType(type) {
    let previousIllustration = this.illustration.value;
    previousIllustration.backgroundTextType = type;
    this.illustration.next(previousIllustration);
  }

  editBorderRadius(border: boolean) {
    let previousIllustration = this.illustration.value;
    previousIllustration.borderRadius = border;
    this.illustration.next(previousIllustration);
  }

  editShowDecoration(show: boolean) {
    let previousIllustration = this.illustration.value;
    previousIllustration.showDecoration = show;
    this.illustration.next(previousIllustration);
  }

  editText(text) {
    let previousIllustration = this.illustration.value;
    previousIllustration.text = text;
    this.illustration.next(previousIllustration);
  }
}
