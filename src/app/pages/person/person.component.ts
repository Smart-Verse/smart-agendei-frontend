import {Component, OnInit} from '@angular/core';
import {DatatableComponent} from "../../shared/components/datatable/datatable.component";
import {DataTable} from "../../shared/components/datatable/datatable";
import {ConfigTableService} from "../../shared/services/configtable/config-table.service";
import {RequestData} from "../../shared/components/request-data";

@Component({
  selector: 'app-person',
    imports: [
        DatatableComponent
    ],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent implements OnInit {
  datatableConfig: DataTable = new DataTable();

  constructor(private configTableService: ConfigTableService) { }

  onLoadAllData($event: any) {

  }

  onSelectedData($event: any) {

  }

  ngOnInit(): void {
    var obj = this.configTableService.getModel("person");
    this.onSetPropertiesDatatable(obj);
  }

  onSetPropertiesDatatable(obj: any): void  {
    this.datatableConfig.fields = obj.fields;
    this.onLoadAllData(new RequestData());
  }
}
