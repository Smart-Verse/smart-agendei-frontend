import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MenuService} from "../../services/menu/menu.service";
import {Tooltip} from "primeng/tooltip";
import {UserConfigurationService} from "../../../services/user-configuration/user-configuration.service";
import {LoadingService} from "../../services/loading/loading.service";


@Component({
  selector: 'app-sidebar-lite',
  providers: [
    UserConfigurationService
  ],
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
  userName: string = "";

  constructor(
    private menuService: MenuService,
    private router: Router,
    private readonly userConfigurationService: UserConfigurationService,
    private readonly loadingService: LoadingService
  ) {
    this._menuitens = this.menuService.menu
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.onVerifyMobile();
    this.onSetConfigurationMobile();
    this.onLoadUserConfiguration();
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

  onLoadUserConfiguration(){
    this.loadingService.showLoading.next(true);
    this.userConfigurationService.getUser().subscribe({
      next: (res) => {
        this.userName = res.output.name;
        this.loadingService.showLoading.next(false);
      },
      error: (err) => {
        this.loadingService.showLoading.next(false);
      }
    });
  }

}
