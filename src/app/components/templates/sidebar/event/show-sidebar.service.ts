import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowSidebarService {

  private sidebarSubject = new Subject<any>();

  constructor() { }

  sendShowSidebar() {
    this.sidebarSubject.next();
  }

  getShowSidebarEvent(): Observable<any>{
    return this.sidebarSubject.asObservable();
  }
}
