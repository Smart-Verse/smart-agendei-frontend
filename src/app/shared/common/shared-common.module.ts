import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { HttpModule } from '../../config/http/http.module';
import { TimelineModule } from 'primeng/timeline';
import {ImageUploadComponent} from "../components/inputs/image-upload/image-upload.component";
import {InputNumberComponent} from "../components/inputs/input-number/input-number.component";
import {InputMaskComponent} from "../components/inputs/input-mask/input-mask.component";
import {InputDateComponent} from "../components/inputs/input-date/input-date.component";
import {AutoCompleteComponent} from "../components/inputs/auto-complete/auto-complete.component";
import {DropdownComponent} from "../components/inputs/dropdown/dropdown.component";
import {InputTextComponent} from "../components/inputs/input-text/input-text.component";
import {LoadingComponent} from "../loading/loading.component";
import {FloatLabelModule} from "primeng/floatlabel";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextComponent,
    LoadingComponent,
    AutoCompleteComponent,
    DropdownComponent,
    InputDateComponent,
    InputMaskComponent,
    InputNumberComponent,
    ImageUploadComponent
  ],
  exports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    SidebarModule,
    DropdownModule,
    FormsModule,
    HttpModule,
    TimelineModule,
    FloatLabelModule,
    LoadingComponent,
    InputTextComponent,
    AutoCompleteComponent,
    DropdownComponent,
    InputDateComponent,
    InputMaskComponent,
    InputNumberComponent,
    ImageUploadComponent
  ]
})
export class SharedCommonModule { }
