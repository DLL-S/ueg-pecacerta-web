import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TopbarData } from '../models/topbar-data.model';

@Injectable({
  providedIn: 'root'
})
export class TopbarTitleService {

  private _topbarData = new BehaviorSubject<TopbarData>({
    title: 'Peça Certa',
    routerUrl: '/'
  })

  constructor() { }

  get topbarData(): TopbarData {
    return this._topbarData.value;
  }

  set topbarData(topbarData: TopbarData) {
      this._topbarData.next(topbarData);
  }
}
