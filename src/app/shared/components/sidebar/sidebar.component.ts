import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import { SharedCommonModule } from '../../common/shared-common.module';
import { RouterLink, RouterOutlet} from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SidebarSubmenuComponent } from './sidebar-submenu/sidebar-submenu.component';
import {MenuModule} from "primeng/menu";
import {ImageUploadService} from "../inputs/image-upload/image-upload.service";
import {ThemeService} from "../../services/theme/theme.service";
import {TranslateService} from "../../services/translate/translate.service";
import {MenuItens} from "../../../config/sidebar/menu-itens";
import { RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'app-sidebar',
    imports: [
        SharedCommonModule,
        RouterLink,
        TooltipModule,
        AvatarModule,
        AvatarGroupModule,
        RouterOutlet,
        SidebarSubmenuComponent,
        MenuModule,
        TabsModule,
        RouterModule
    ],
    providers: [
        ImageUploadService
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  @Input() tabSuport: boolean = false;
  @Input() currentTab: string = "dashboard";
  @Input() currentMenu: any;

  tabs: { title: string; icon: string; route: string, fixed: boolean }[] = [];

  theme: string = 'aura-dark-purple';
  menu = new MenuItens();
  isExpanded = false;
  menuItems: any;
  showSidebar: boolean = true;
  showSidebarMobile: boolean = false;
  screenWidth: number = 0;
  isMobile: boolean = false;
  image: string | null = null;



  constructor(
    private readonly imageService: ImageUploadService,
    private readonly themeService: ThemeService,
    private readonly translateService: TranslateService,
  ){
    this.menuItems = this.menu.menuItems;
    this.currentMenu = this.menuItems[0];
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.onVerifyMobile();
    this.onSetConfigurationMobile();
    //this.onLoadImage();
    this.tabs.push(this.currentMenu);
  }

  toggleMenu(menu: any) {
    this.isExpanded = false;
    if(menu.submenu.length > 0){
      this.isExpanded = true;
    }

    this.onSetTab(menu, this.isExpanded);
    this.currentMenu = menu;
    this.onDisableAndSetActiveLink();
  }

  closeMenu(){
    this.isExpanded = false;
    if(this.isMobile){
      this.showSidebar = false;
      this.showSidebarMobile = true;
    }
    this.onDisableAndSetActiveLink();
  }

  onDisableAndSetActiveLink() {

    this.menu.menuItems.forEach(e => {

      const disableLink = document.getElementById(e.name);
      if(disableLink){
        disableLink.classList.remove('active');
      }
    });

    const activeLink = document.getElementById(this.currentMenu.name);
    if(activeLink){
      activeLink.classList.add('active');
    }
  }

  onMobileOpenMenu(){
    this.onDisableAndSetActiveLink();
    this.isExpanded = true;
    if(this.isMobile){
      this.showSidebar = true;
      this.showSidebarMobile = false;
    }
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

  onSetTab(menu: any, isExpanded: boolean) {

    if(this.tabSuport && !isExpanded){
      let exists = this.tabs.find((tab: any) => tab.title === menu.name);
      if(exists){
        this.currentTab = menu.route;
        return;
      }

      this.tabs.push({
        title: menu.name,
        icon: menu.icon,
        route: menu.route,
        fixed: menu.fixed,
      })
      this.currentTab = menu.route;
    }
  }

  onMenuSelected(menu: any){
    //validar não inserir menus repetidos
    this.onSetTab(menu, false);
  }

  onTabClose(menu: any){
    this.tabs = this.tabs.filter(tab => tab.title !== menu.title);
    this.currentTab = this.tabs[this.tabs.length - 1].route;
  }

  onTranslateMenu(name: string){
    return this.translateService.translate(name);
  }


/*
  //Exclusivo para uso aqui
  onLoadImage(){
    this.userConfigurationService.getUser().subscribe({
      next: (res) => {
        this.imageService.onRequestDonwload(res.output.userPhoto).subscribe({
          next: (req) => {
            this.image = req["url"];
            this.themeService.onConfigurationTheme(res.output.theme);
            this.translateService.loadTranslationsUser(res.output.lang);
          }
        });
      }
    });
  }
  */
}
