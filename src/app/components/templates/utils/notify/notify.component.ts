import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notify',
  template: `<p-toast></p-toast>`,
  styles: []
})
export class NotifyComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  showMessage(severidade: string, titulo: string, detalhe: string) {
    this.messageService.add({ severity: severidade, summary: titulo, detail: detalhe });
  }
}
