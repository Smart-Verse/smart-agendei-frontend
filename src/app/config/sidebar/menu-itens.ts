import {inject} from "@angular/core";
import {TranslateService} from "../../shared/services/translate/translate.service";


export class MenuItens{
    translate = inject(TranslateService);
    menuItems = [
        {
          route: "dashboard",
          iconClass: 'pi pi-chart-bar',
          tooltip: this.translate.translate("dashboard"),
          name: this.translate.translate("dashboard"),
          submenu: []
        },
        {
          iconClass: 'pi pi-cog',
          tooltip: 'Configurações',
          name: 'Configurações',
          submenu: [
            {
              name: 'Configurações do usuário',
              route:'configuration'
            },
            {
              name: 'Configurações do globais',
              submenu: [
                {
                  name: 'Traduções',
                  route:''
                },
                {
                  name: 'Permissionamento',
                  route:''
                },
                {
                  name: 'Cabeçalho Relatórios',
                  route:''
                },
              ]
            },
            {
              name: 'Cadastro de usuários',
              route:'register/revenues'
            },
            {
              name: 'Logout',
              route:'login'
            },
          ]
        },
    ];
}
