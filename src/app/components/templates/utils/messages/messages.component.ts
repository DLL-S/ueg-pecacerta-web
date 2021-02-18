import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-messages',
  template: `<small class="p-invalid" *ngIf="hasError()">
  {{ text }}
</small>`,
  styles: []
})
export class MessagesComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  hasError(): Boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
