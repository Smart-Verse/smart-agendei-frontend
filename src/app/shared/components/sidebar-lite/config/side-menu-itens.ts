import {inject} from "@angular/core";
import {TranslateService} from "../../../services/translate/translate.service";

export class SideMenuItens {
  translate = inject(TranslateService);
  menuItems = [
    {
      route: "notification",
      iconClass: 'pi pi-bell',
      tooltip: this.translate.translate("notification"),
      name: this.translate.translate("notification"),
      submenu: []
    },
    {
      route: "configuration",
      iconClass: 'pi pi-bell',
      tooltip: this.translate.translate("notification"),
      name: this.translate.translate("notification"),
      submenu: []
    },
  ]
}
