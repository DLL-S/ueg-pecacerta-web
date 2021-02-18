import { Component, OnInit } from '@angular/core';
import { ShowSidebarService } from './../sidebar/event/show-sidebar.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  title = "Peça Certa";

  constructor(private showSidebarService: ShowSidebarService) { }

  ngOnInit(): void {
  }

  callSideBar() {
    this.showSidebarService.sendShowSidebar();
  }
}
