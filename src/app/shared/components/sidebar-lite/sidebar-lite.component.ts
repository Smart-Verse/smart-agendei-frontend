import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MenuService} from "../../services/menu/menu.service";
import {Tooltip} from "primeng/tooltip";


@Component({
  selector: 'app-sidebar-lite',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    Tooltip,
    RouterLinkActive
  ],
  templateUrl: './sidebar-lite.component.html',
  styleUrl: './sidebar-lite.component.scss'
})
export class SidebarLiteComponent implements OnInit {

  _menuitens: any = [];
  isExpanded = false;
  showSidebar: boolean = true;
  showSidebarMobile: boolean = false;
  screenWidth: number = 0;
  isMobile: boolean = false;

  constructor(
    private menuService: MenuService,
    private router: Router
  ) {
    this._menuitens = this.menuService.menu
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.onVerifyMobile();
    this.onSetConfigurationMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.onVerifyMobile();
    this.onSetConfigurationMobile();
  }

  onVerifyMobile(){
    if(this.screenWidth <= 600){
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  onSetConfigurationMobile(){
    if(this.isMobile) {
      this.showSidebarMobile = true;
      this.showSidebar = false;
    } else {
      this.showSidebarMobile = false;
      this.showSidebar = true;
    }
  }


}
