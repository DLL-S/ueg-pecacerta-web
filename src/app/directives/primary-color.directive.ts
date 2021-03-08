import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPrimaryColor]'
})
export class PrimaryColorDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = '#18778C';
  }

}
