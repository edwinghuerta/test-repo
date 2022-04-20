import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor() { }
  public content: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public password: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public comment: BehaviorSubject<any> = new BehaviorSubject<any>({});
 

  setContentPreview(content: any) {
    let previousContent = this.content.value;
    previousContent.slides = content.slides;
    previousContent.headline = content.headline;
    this.content.next(previousContent);
   
  }

  setTargets(targets:any){
    let previousContent = this.content.value;
    previousContent.targets = targets;
    this.content.next(previousContent);
  }

  setOccasion(occasion:any){
    let previousContent = this.content.value;
    previousContent.occasion = occasion;
    this.content.next(previousContent);
  }

  getContentPreview(){
    return this.content.asObservable();
  }

  setPassword(content: any) {
    this.password.next(content);
   
  }

  getPassword(){
    return this.password.asObservable();
  }

  setComment(comment){

    this.comment.next(comment);
  }

  getComment(){
    return this.comment.asObservable();
  }

  

}
