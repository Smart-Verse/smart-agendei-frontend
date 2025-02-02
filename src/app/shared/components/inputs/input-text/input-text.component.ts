import { Component, Input } from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

import { FieldsService } from '../../../services/fields/fields.service';
import {TooltipModule} from "primeng/tooltip";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";

import { AutoFocusModule } from 'primeng/autofocus';
import {AutoCompleteModule} from "primeng/autocomplete";
import {AppControlValueAccessor} from "../../app-control-value";
import {TextareaModule} from "primeng/textarea";

@Component({
    selector: 'app-input-text',
    imports: [
        CommonModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        FloatLabelModule,
        TooltipModule,
        TextareaModule,
        AutoFocusModule,
        AutoCompleteModule
    ],
    templateUrl: './input-text.component.html',
    styleUrl: './input-text.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputTextComponent,
            multi: true
        }
    ]
})
export class InputTextComponent extends AppControlValueAccessor {

  @Input() fieldType: string = "input-text";

  constructor(private readonly fieldServiceInputText: FieldsService){
    super(fieldServiceInputText)
  }
}
