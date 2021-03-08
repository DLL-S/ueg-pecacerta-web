import { Component, OnInit } from '@angular/core';
import { TopbarTitleService } from 'src/app/services/topbar-title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private topbarTitleService: TopbarTitleService) {
    topbarTitleService.topbarData = {
      title: 'Login',
      routerUrl: '/login'
    }
  }

  ngOnInit(): void {
  }

}
