import { Component } from '@angular/core';
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";
import {SidebarLiteComponent} from "../../shared/components/sidebar-lite/sidebar-lite.component";

@Component({
  selector: 'app-home',
  imports: [SidebarLiteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
