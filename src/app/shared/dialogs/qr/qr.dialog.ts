import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DialogRef } from 'src/app/libs/dialog/types/dialog-ref';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.dialog.html',
  styleUrls: ['./qr.dialog.scss']
})
// tslint:disable-next-line: component-class-suffix
export class QrDialog {

  @ViewChild("qrcode", {read: ElementRef}) qr: ElementRef;

  @Input() url: string;

  constructor(public ref: DialogRef) { }

  downloadQr() {
    const parentElement = this.qr.nativeElement.querySelector("img").src;
    let blobData = this.convertBase64ToBlob(parentElement);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
      window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
    } else { // chrome
      const blob = new Blob([blobData], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Qrcode';
      link.click();
    }
    this.ref.close();
  }

  private convertBase64ToBlob(Base64Image: any) {
    // SPLIT INTO TWO PARTS
    const parts = Base64Image.split(';base64,');
    // HOLD THE CONTENT TYPE
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    const uInt8Array = new Uint8Array(decodedData.length);
    // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // RETURN BLOB IMAGE AFTER CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }

}