import {Type} from "@angular/core";
import {PersonModalComponent} from "../../components/person-modal/person-modal.component";

export const config: RegisterRoutes[] = [
  {
    header: "Cadastro de pessoas",
    view: "person",
    route: "person",
    paramExtra: "",
    defaultFilter: "",
    component: PersonModalComponent
  },
  {
    header: "Cadastro de serviços",
    view: "services",
    route: "services",
    paramExtra: "",
    defaultFilter: "",
    component: PersonModalComponent
  }
]

export class RegisterRoutes {
  header: string = "";
  view: string = "";
  route: string = "person";
  paramExtra: string = "";
  defaultFilter: string = "";
  component: Type<any> = PersonModalComponent;
}
