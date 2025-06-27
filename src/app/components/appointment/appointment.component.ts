import {Component, OnInit} from '@angular/core';
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {ToastService} from "../../shared/services/toast/toast.service";
import {FormGroup} from "@angular/forms";
import {statusAppointment} from "../../shared/util/constants";
import {FieldsService} from "../../shared/services/fields/fields.service";
import {TranslateService} from "../../shared/services/translate/translate.service";
import {ActivatedRoute} from "@angular/router";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AppointmentConfig} from "./appointment.config";
import {convertDate} from "../../shared/util/utils";
import {CookiesService} from "../../shared/services/cookies/cookies.service";
import {EnumCookie} from "../../shared/services/cookies/cookie.enum";

@Component({
  selector: 'app-appointment',
  imports: [
    SharedCommonModule
  ],
  providers: [
    ToastService
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent  implements OnInit {

  public formGroup: FormGroup;
  public extras: any[] = [];
  protected configObj: AppointmentConfig = new AppointmentConfig();
  private userData: any;

  _status = statusAppointment

  constructor(
    private readonly fieldsService: FieldsService,
    public readonly translateService: TranslateService,
    private readonly toastService: ToastService,
    private route: ActivatedRoute,
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
    private readonly cookiesService: CookiesService
  ) {
    this.formGroup = this.fieldsService.onCreateFormBuiderDynamic(this.configObj.fields);
  }

  ngOnInit(): void {
    if(this.config.data) {
      this.config.data.status = this._status.filter(e => e.key === this.config.data.status)[0];
      this.config.data.startDate = convertDate(this.config.data.startDate);
      this.config.data.endDate = convertDate(this.config.data.endDate);
      this.formGroup.patchValue(this.config.data);
    }
    this.userData = this.cookiesService.getObject(EnumCookie.USER_DATA);
  }

  onSave() {
    if(this.formGroup.valid) {
      this.ref.close(this.configObj.convertFormGroupToDTO(this.formGroup, this.extras, this.userData));
    }else {
      this.toastService.warn({summary: "Mensagem", detail: this.translateService.translate("common_message_invalid_fields")});
      this.fieldsService.verifyIsValid();
    }
  }

  onCancel() {
    this.ref.close(null);
  }

  onAddExtras() {
    let ex = this.formGroup.get('extra')?.value;
    if(ex){
      this.extras.push(ex);
      this.formGroup.get('extra')?.setValue(null);
      this.formGroup.get('extra')?.reset();
      this.onCalculateExtras();
    }

  }

  onRemoveExtras(service: any) {
    this.extras.splice(this.extras.indexOf(service), 1);
    this.onCalculateExtras();
  }

  onCalculateExtras() {

    let valueExtras = 0;
    let valueService = 0;
    let valueDiscont = 0;
    this.extras.forEach(item => {
      valueExtras += item.price;
    });

    let service = this.formGroup.get('service')?.value;
    if(service){
      valueService = service.price;
    }

    let discont = this.formGroup.get('discount')?.value;
    if(discont){
      valueDiscont = discont;
    }

    this.formGroup.get('value')?.setValue((valueService));
    this.formGroup.get('valueExtras')?.setValue(valueExtras);

    this.formGroup.get('total')?.setValue((valueService + valueExtras - valueDiscont));
  }
}
