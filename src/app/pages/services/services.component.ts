import {Component, OnInit} from '@angular/core';
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {DataTable} from "../../shared/components/datatable/datatable";
import {ConfigTableService} from "../../shared/services/configtable/config-table.service";
import {RequestData} from "../../shared/components/request-data";

@Component({
  selector: 'app-services',
  imports: [
    SharedCommonModule
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {

  datatableConfig: DataTable = new DataTable();

  constructor(private configTableService: ConfigTableService) { }

  onLoadAllData($event: any) {

  }

  onSelectedData($event: any) {

  }

  ngOnInit(): void {
    var obj = this.configTableService.getModel("services");
    this.onSetPropertiesDatatable(obj);

  }

  onSetPropertiesDatatable(obj: any): void  {
    this.datatableConfig.fields = obj.fields;
    this.onLoadAllData(new RequestData());
  }
}

