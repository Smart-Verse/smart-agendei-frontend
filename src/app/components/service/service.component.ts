import {Component, OnInit} from '@angular/core';
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {ToastService} from "../../shared/services/toast/toast.service";
import {FormGroup} from "@angular/forms";
import {ServiceConfig} from "./service.config";
import {FieldsService} from "../../shared/services/fields/fields.service";
import {TranslateService} from "../../shared/services/translate/translate.service";
import {ActivatedRoute} from "@angular/router";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {status} from "../../shared/util/constants";
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'app-service',
  imports: [
    SharedCommonModule,
    ColorPickerModule
  ],
  providers: [
    ToastService
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit {

  public formGroup: FormGroup;
  protected configObj: ServiceConfig = new ServiceConfig();

  _status = status

  constructor(
    private readonly fieldsService: FieldsService,
    public readonly translateService: TranslateService,
    private readonly toastService: ToastService,
    private route: ActivatedRoute,
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
  ) {
    this.formGroup = this.fieldsService.onCreateFormBuiderDynamic(this.configObj.fields);
  }

  ngOnInit(): void {
    if(this.config.data){
      this.config.data.status = this._status.filter(e => e.key === this.config.data.status)[0];
      this.formGroup.patchValue(this.config.data);
    }
  }

  onSave() {
    if(this.formGroup.valid) {
      this.ref.close(this.configObj.convertFormGroupToDTO(this.formGroup));
    }else {
      this.toastService.warn({summary: "Mensagem", detail: this.translateService.translate("common_message_invalid_fields")});
      this.fieldsService.verifyIsValid();
    }
  }

  onCancel() {
    this.ref.close(null);
  }
}
