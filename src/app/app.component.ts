import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from './services/token-storage.service';
import { Router } from '@angular/router';


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

  private roles: string[];
  isLoggedIn = false;
  allowAccess = false;
  email: string;

  constructor(private primengConfig: PrimeNGConfig, private titleService: Title, private tokenStorageService: TokenStorageService, private route: Router) {
    this.titleService.setTitle("Peça Certa");
  }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.allowAccess = this.roles.includes('FUNCIONARIO');

      this.email = user.email;
      this.route.navigate(['/']);
    }
    else {
      this.route.navigate(['/login']);
    }
  }
}
