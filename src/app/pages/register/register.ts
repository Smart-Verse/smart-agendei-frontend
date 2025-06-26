import {Type} from "@angular/core";
import {ClientComponent} from "../../components/client/client.component";
import {ServiceComponent} from "../../components/service/service.component";

export const config: RegisterRoutes[] = [
  {
    header: "Cadastro de clientes",
    view: "client",
    route: "client",
    paramExtra: "",
    defaultFilter: "",
    component: ClientComponent
  },
  {
    header: "Cadastro de serviços",
    view: "service",
    route: "service",
    paramExtra: "",
    defaultFilter: "",
    component: ServiceComponent
  }
]

export class RegisterRoutes {
  header: string = "";
  view: string = "";
  route: string = "person";
  paramExtra: string = "";
  defaultFilter: string = "";
  component: Type<any> = ClientComponent;
  loadComponent?: () => Promise<Type<any>>;
}
