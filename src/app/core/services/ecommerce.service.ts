import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  item: BehaviorSubject<any> = new BehaviorSubject<any>({
    letter: {
      fontFamily: 'flair',
      letters: ['G', 'A', 'B'],
      color: '#606060',
      position: 5,
      text: 'sss',
    },
    type: {
      type: 1,
      size: '30x30',
      quantity: 100,
      proportion: 'Cuadrada',
      color: '#eeeeee',
      quality:'Tissue',
    },
    icon: { color: '#606060', image: 'Asset 6' },
    ammount: 0.0,
  });
  defaultQuantity = 0;
  propertyToChange = '';
  items: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  image: any;
  constructor() {}
isMail = false;
public mail = '';
public phone;
  setItem(item) {
    this.item.next(item);
  }

  setPrice(price){
    let items = this.items.value;
    let item = items[0];
    item.type.price = price;
    items[0] = item;
    this.items.next(items);
  }

  setItems(items){
    console.log("items",items);
    this.items.next(items);
  }

  addQuantity(){
    let items = this.items.value;
    let item = items[0];
    item.type.quantity = item.type.quantity + this.defaultQuantity;
    items[0] = item;
    this.items.next(items);
  }

  reduceQuantity(){
    let items = this.items.value;
    let item = items[0];
    if(item.type.quantity-this.defaultQuantity>0){
      item.type.quantity -= this.defaultQuantity;
      items[0] = item;
      this.items.next(items);
    }
  }

  setDefaultQuantity(value){
    console.log("setDefaultQuantity",value);
    // if(this.defaultQuantity ==0){
      this.defaultQuantity = value;
    // }
  }

  setItemWithParams(
    fontFamily,
    text,
    colorText,
    quantity,
    colorType,
    type,
    size,
    icon,
    colorIcon
  ) {
    this.setItemLetter(fontFamily, text, colorText,type);
    this.setItemType(quantity, colorType, type, size);
    this.setItemIcon(icon, colorIcon,type);
  }

  setItemLetter(fontFamily, text, color,type) {
    let items = this.items.value;
    let value = items.find(e=>e.type.type==type);
    let index = items.indexOf(value);
    console.log("index",index);
    value.letter.fontFamily = fontFamily;
    value.letter.text = text;
    value.letter.color = color;
    items = items.filter(e=>e.type.type!=type);
    items.splice(index,0,value);
    this.items.next(items);

  }

  setItemType(quantity, color, type, size) {
    let items = this.items.value;
    let value = items.find(e=>e.type.type==type);
    let index = items.indexOf(value);

    value.type.quantity = quantity;
    value.type.color = color;
    value.type.type = type;
    value.type.size = size;
    items = items.filter(e=>e.type.type!=type);
    items.splice(index,0,value);
    this.items.next(items);
  }

  setItemIcon(image, color,type) {
    let items = this.items.value;
    let value = items.find(e=>e.type.type==type);
    let index = items.indexOf(value);
    value.icon.image = image;
    value.icon.color = color;
    items = items.filter(e=>e.type.type!=type);
    items.splice(index,0,value);
    this.items.next(items);
  }

setItemQuality(quality,type){
  let items = this.items.value;
  let value = items.find(e=>e.type.type==type);
  let index = items.indexOf(value);
  value.type.quality = quality;
  items = items.filter(e=>e.type.type!=type);
  items.splice(index,0,value);
  this.items.next(items);
}

setItemQuantity(quantity,type){
  let items = this.items.value;
  let value = items.find(e=>e.type.type==type);
  let index = items.indexOf(value);
  value.type.quantity = quantity;
  items = items.filter(e=>e.type.type!=type);
  items.splice(index,0,value);
  this.items.next(items);
}

  setType(type){
    let value = this.item.value;
    value.type.type = type;
    this.item.next(value);
  }

  getItemByType(type){
    let items = this.items.value;
    console.log(items);
   let item = items.find(e=>e.type.type==type);
   this.item.next(item);
   return this.item;

  }


  getAmmount(item?: any) {
    let values = item ? item : this.items.value;
    console.log(values);
    let ammount = 0;
    if(Array.isArray(values)) {
      values.forEach(element => {
        let ammountItem = 0;
        ammountItem = ((this.ammountColor(element.type.color) ?? 0) 
                +(this.ammountType(element.type.quality) ?? 0))*element.type.quantity
                 ;
                 ammount = ammount + ammountItem;
      });
    } else {
      let ammountItem = 0;
      ammountItem = ((this.ammountColor(values.type.color) ?? 0) 
      +(this.ammountType(values.type.quality) ?? 0))*values.type.quantity;
      ammount = ammount + ammountItem;
    }
  
    if (ammount) {
      return ammount;
    }
    return 0;
  }

  getItem() {
    return this.item;
  }

  getItems(){
    return this.items;
  }

  ammountColor(color) {
    if (color == '#C72C74') return 0.0;
    if (color == '#EEEEEE') return 1.0;
    if (color == '#606060') return 2.0;
    if (color == '#E4C012') return 3.0;
    if (color == '#2262A9') return 5.0;
    if (color == '#799B27') return 10.0;
    return 0;
  }

  ammountPosition(position) {
    if (position == 1) return 0.0;
    if (position == 2) return 0.0;
    if (position == 3) return 0.0;
    if (position == 4) return 0.0;
    if (position == 5) return 0.0;
    return 0;
  }

  ammountFontFamily(fontFamily) {
    if (fontFamily == 'flair') return 2.0;
    if (fontFamily == 'serif') return 3.0;
    if (fontFamily == 'empire') return 5.0;
    return 0;
  }

  ammountSize(size) {
    if (size == '10x10') return 2.0;
    if (size == '20x20') return 4.0;
    if (size == '30x30') return 6.0;
    return 0;
  }

  ammountProportion(proportion) {
    if (proportion == 'Cuadrada') return 3.0;
    if (proportion == 'Rectangular') return 5.0;
    return 0;
  }

  ammountLetters(letters) {
    if (letters == undefined) return;
    return 2 * letters.length;
  }
  ammountType(type) {
    if (type == 'Linen Like') return 2.0;
    if (type == 'Personal') return 4.0;
    if (type == 'Tissue') return 4.0;
    if (type == 'Restorant') return 6.0;
    return 0;
  }

  literalColor(color) {
    if (color.toUpperCase() == '#C72C74') return '42-K';
    if (color.toUpperCase() == '#EEEEEE') return 'Blanco';
    if (color.toUpperCase() == '#606060') return 'Gris';
    if (color.toUpperCase() == '#E4C012') return '34-AP';
    if (color.toUpperCase() == '#2262A9') return '16-L';
    if (color.toUpperCase() == '#799B27') return '18-B';
    return '';
  }

  literalPosition(position) {
    if (position == '1') return 'Izquierda arriba';
    if (position == '2') return 'Derecha arriba';
    if (position == '3') return 'Centro';
    if (position == '4') return 'Izquierda abajo';
    if (position == '5') return 'Derecha abajo';
    return '';
  }

  changeProperty(type) {
    this.propertyToChange = type;
  }

  getPropertyToChange() {
    let item = this.item.value;
    if (this.propertyToChange == '0') {
      return {
        isQuantity: true,
        title: 'Cantidad',
        previousValue: item.type.quantity,
        propertyToChange: this.propertyToChange,
      };
    } else if (this.propertyToChange == '1') {
      return {
        isImage: true,
        isSize: true,
        title: 'Tamaño',
        previousValue: item.type.size,
        items: [
          {
            src: '10x10.png',
            title: '10x10',
            price: this.ammountSize('10x10'),
          },
          {
            src: '20x20.png',
            title: '20x20',
            price: this.ammountSize('20x20'),
          },
          {
            src: '30x30.png',
            title: '30x30',
            price: this.ammountSize('30x30'),
          },
        ],
        propertyToChange: this.propertyToChange,
      };
    } else if (this.propertyToChange == '2') {
      return {
        isImage: true,
        title: 'Textura',
        previousValue: item.type.type,
        items: [
          {
            src: 'linen-like.png',
            title: 'Linen Like',
            price: this.ammountType('Linen Like'),
          },
          {
            src: 'personal.png',
            title: 'Personal',
            price: this.ammountType('Personal'),
          },
          {
            src: 'restorant.png',
            title: 'Restorant',
            price: this.ammountType('Restorant'),
          },
        ],
        propertyToChange: this.propertyToChange,
      };
    } else if (this.propertyToChange == '3') {
      return {
        isColor: true,
        title: 'Color',
        previousValue: this.literalColor(item.type.color),
        propertyToChange: this.propertyToChange,
        items: [
          {
            color: '#EEEEEE',
            title: this.literalColor('#EEEEEE'),
            price: this.ammountColor('#EEEEEE'),
          },
          {
            color: '#606060',
            title: this.literalColor('#606060'),
            price: this.ammountColor('#606060'),
          },
        ],
      };
    } else if (this.propertyToChange == '4') {
      return {
        isLetterChange: true,
        previousValue: item.letter.letters,
        title: 'Letras a imprimir',
        propertyToChange: this.propertyToChange,
      };
    } else if (this.propertyToChange == '5') {
      return {
        isFont: true,
        title: 'Tipo de letra',
        previousValue: item.letter.fontFamily,
        items: [
          {
            title: 'Flair',
            price: this.ammountFontFamily('flair'),
            class: 'flair',
          },
          {
            title: 'Serif',
            price: this.ammountFontFamily('serif'),
            class: 'serif',
          },
          {
            title: 'Empire',
            price: this.ammountFontFamily('empire'),
            class: 'empire',
          },
        ],
        propertyToChange: this.propertyToChange,
      };
    } else if (this.propertyToChange == '6') {
      return {
        isColor: true,
        title: 'Color',
        previousValue: this.literalColor(item.type.color),
        propertyToChange: this.propertyToChange,
        items: [
          {
            color: '#C72C74',
            title: this.literalColor('#C72C74'),
            price: this.ammountColor('#C72C74'),
          },
          {
            color: '#EEEEEE',
            title: this.literalColor('#EEEEEE'),
            price: this.ammountColor('#EEEEEE'),
          },
          {
            color: '#606060',
            title: this.literalColor('#606060'),
            price: this.ammountColor('#606060'),
          },
          {
            color: '#E4C012',
            title: this.literalColor('#E4C012'),
            price: this.ammountColor('#E4C012'),
          },
          {
            color: '#2262A9',
            title: this.literalColor('#2262A9'),
            price: this.ammountColor('#2262A9'),
          },
          {
            color: '#799B27',
            title: this.literalColor('#799B27'),
            price: this.ammountColor('#799B27'),
          },
        ],
      };
    } else if (this.propertyToChange == '7') {
      return {
        isPosition: true,
        title: 'Lugar',
        previousValue: this.literalPosition(item.letter.position),
        items: [
          {
            title: 'Izquierda arriba',
            price: this.ammountPosition(1),
            position: 1,
          },
          {
            title: 'Derecha arriba',
            price: this.ammountPosition(2),
            position: 2,
          },
          { title: 'Centro', price: this.ammountPosition(3), position: 3 },
          {
            title: 'Izquierda abajo',
            price: this.ammountPosition(4),
            position: 4,
          },
          {
            title: 'Derecha abajo',
            price: this.ammountPosition(5),
            position: 5,
          },
        ],
        propertyToChange: this.propertyToChange,
      };
    } else {
      return {
        isColor: true,
        title: 'Proporción',
        previousValue: item.type.proportion,
        propertyToChange: this.propertyToChange,
        items: [
          {
            title: 'Cuadrada',
            price: this.ammountProportion('Cuadrada'),
          },
          {
            title: 'Rectangular',
            price: this.ammountProportion('Rectangular'),
          },
        ],
      };
    }
  }

  selectProperty(item, property) {
    let previousItem = this.item.value;

    if (property == '0') {
      previousItem.type.quantity = item.quantity;
    } else if (property == '1') {
      previousItem.type.size = item.title;
    } else if (property == '2') {
      previousItem.type.type = item.title;
      previousItem.type.image = item.src;
    } else if (property == '3') {
      previousItem.type.color = item.color;
    } else if (property == '4') {
      previousItem.letter.letters = item.letters;
    } else if (property == '5') {
      previousItem.letter.fontFamily = item.class;
    } else if (property == '6') {
      previousItem.letter.color = item.color;
    } else if (property == '7') {
      previousItem.letter.position = item.position;
    } else {
      previousItem.type.proportion = item.title;
    }
    this.item.next(previousItem);
  }
}
