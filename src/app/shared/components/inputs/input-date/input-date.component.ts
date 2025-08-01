import {Component, Input} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {FloatLabelModule} from "primeng/floatlabel";
import {TooltipModule} from "primeng/tooltip";
import {FieldsService} from "../../../services/fields/fields.service";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {AutoFocusModule} from "primeng/autofocus";
import {AutoCompleteModule} from "primeng/autocomplete";
import {AppControlValueAccessor} from "../../app-control-value";
import {DatePicker} from "primeng/datepicker";

@Component({
    selector: 'app-input-date',
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    TooltipModule,
    DropdownModule,
    AutoFocusModule,
    AutoCompleteModule,
    DatePicker
  ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputDateComponent,
            multi: true
        }
    ],
    templateUrl: './input-date.component.html',
    styleUrl: './input-date.component.scss'
})
export class InputDateComponent extends AppControlValueAccessor {

  @Input() format: string = "dd/mm/yy";
  @Input() showTime: boolean = false;

  ptBr: any = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    today: "Hoje",
    clear: "Limpar",
  };



  constructor(
    private readonly fieldServiceInputText: FieldsService,
  ){
    super(fieldServiceInputText)
  }
}
