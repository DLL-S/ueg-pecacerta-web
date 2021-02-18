import { Component, OnInit } from '@angular/core';
import { ShowSidebarService } from './../sidebar/event/show-sidebar.service';
import { TopbarTitleService } from './../../../services/topbar-title.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private showSidebarService: ShowSidebarService, private topbarTitleService: TopbarTitleService) { }

  ngOnInit(): void { }

  get title(): string {
    return this.topbarTitleService.topbarData.title;
  }

  get routerUrl(): string {
    return this.topbarTitleService.topbarData.routerUrl;
  }

  callSideBar() {
    this.showSidebarService.sendShowSidebar();
  }
}
