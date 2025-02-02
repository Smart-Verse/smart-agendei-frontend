import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SideMenuItens} from "./config/side-menu-itens";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-sidebar-lite',
    imports: [
      CommonModule,
      RouterOutlet
    ],
  templateUrl: './sidebar-lite.component.html',
  styleUrl: './sidebar-lite.component.scss'
})
export class SidebarLiteComponent {

  menuConfig = new SideMenuItens();
  _menuitens = this.menuConfig.menuItems;

}
