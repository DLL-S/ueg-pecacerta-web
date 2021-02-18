import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsMobileService {

  constructor() { }

  checkPlatform(): Boolean {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent))
      return true;
    return false;
  };
}
