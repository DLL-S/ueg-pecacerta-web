import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `@media(min-width: 1200px) {
        .container {
          width: 95%;
          margin: 0 auto auto;
        }
      }
  `]
})
export class AppComponent {

  constructor(private primengConfig: PrimeNGConfig, private titleService: Title) {
    this.titleService.setTitle("Peça Certa");
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
