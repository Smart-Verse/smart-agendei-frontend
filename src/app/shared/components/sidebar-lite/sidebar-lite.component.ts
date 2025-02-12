import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {SideMenuItens} from "./config/side-menu-itens";
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
export class SidebarLiteComponent {

  menuConfig = new SideMenuItens();
  _menuitens: any = [];

  constructor(
    private menuService: MenuService,
    private router: Router
  )
  {
    this._menuitens = this.menuService.menu
  }


  onMenuRoute(route: string){
    this.router.navigate([route]);
  }


}
