import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule  } from 'primeng/table';
import { DataTable } from './datatable';
import { SidebarModule } from 'primeng/sidebar';
import {Ripple} from "primeng/ripple";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '../../services/translate/translate.service';
import {RequestData} from "../request-data";
import {TreeTableModule} from "primeng/treetable";


export enum Action {
  DELETE,
  EDIT,
  ADD
}

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    Ripple,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PaginatorModule,
    ConfirmDialogModule,
    TreeTableModule
  ],
  providers: [
    ConfirmationService,
    DatePipe
  ],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent {

  selectedItem: any;
  sidebarVisible: boolean = false;
  @Input() config: DataTable = new DataTable();
  @Input() isTreetable: boolean = false;
  @Input() parentObjectName: string = "";

  @Output() onRegister: EventEmitter<any> = new EventEmitter();
  @Output() onRefresh: EventEmitter<RequestData> = new EventEmitter();



  constructor(
    private confirmationService: ConfirmationService,
    private readonly translateService: TranslateService,
    private datePipe: DatePipe,
  ){
  }

  onRowData(row: any, header: string, col: any){
    const keys = header.split(".");
    let value = keys.reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : null), row);
    return this.onCustomValue(value,col);
  }

  onCustomValue(value: any, col: any): any{
    if(col.customValue){
      switch (col.customValue){
        case "MONEY":
          value = parseFloat(value).toFixed(2);
          break;
        case "DATE":
          value = this.datePipe.transform(value, 'dd/MM/yyyy')!;
          break;
        default:
          break;
      }
    }
    return value
  }

  pageChange($event: PaginatorState) {
    var data = new RequestData();
    data.size = $event.rows;
    data.offset = $event.page ? $event.page + 1 : 0;
    this.onRefresh.emit(data);
  }

  onShowFilters() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  onRegisterData(item: any, action: Action){
    let obj = {
      data: item,
      action: action
    }
    this.onRegister.emit(obj);
  }

  onRegisterDataTree(item: any, action: Action, rowNode: any) {
    let obj = {
      data: item,
      action: action,
      parent: null
    }
    if(obj.action === 1){
      //obj.data[this.parentObjectName] = (rowNode.parent === null ? null : rowNode.parent.data);
      obj.data.action = action;
      obj.parent = (rowNode.parent === null ? null : rowNode.parent.data);
      if(obj.parent && obj.parent[this.parentObjectName])
        delete obj.parent[this.parentObjectName];
    } else if(obj.action === 2) {
      obj.parent = rowNode.node.data;
    }

    this.onRegister.emit(obj);
  }

  onRefreshData(){
    this.onRefresh.emit(new RequestData());
  }

  onSelection(item: any){

  }

  onDeleteData(item: any, action: Action){
    this.confirmationService.confirm({
      message: this.translateService.translate("common_message_confirmation_delete"),
      header: this.translateService.translate("common_message_header_confirmation_delete"),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptLabel: this.translateService.translate("common_action_yes"),
      rejectLabel: this.translateService.translate("common_action_no"),
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        if (Array.isArray(item)) {
          item.forEach(e => {
            this.onRegisterData(e,action)
          });
        } else {
          this.onRegisterData(item,action)
        }
      },
      reject: () => {}
    });
  }
}
