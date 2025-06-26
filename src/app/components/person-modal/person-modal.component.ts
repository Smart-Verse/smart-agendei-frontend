import {Component, OnInit} from '@angular/core';
import {SharedCommonModule} from "../../shared/common/shared-common.module";

import {DatePipe} from "@angular/common";
import {ImageUploadService} from "../../shared/components/inputs/image-upload/image-upload.service";
import {FormGroup} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FieldsService} from "../../shared/services/fields/fields.service";
import {TranslateService} from "../../shared/services/translate/translate.service";
import {ActivatedRoute} from "@angular/router";
import {PersonConfig} from "./person.config";
import {gender, maritalStatus, status} from "../../shared/util/constants";
import {ToastService} from "../../shared/services/toast/toast.service";

@Component({
  selector: 'app-person-modal',
  imports: [
    SharedCommonModule
  ],
  providers: [
    ToastService,
    DatePipe,
    ImageUploadService
  ],
  templateUrl: './person-modal.component.html',
  styleUrl: './person-modal.component.scss'
})
export class PersonModalComponent implements OnInit {

  public personFormGroup: FormGroup;
  protected readonly _status = status;
  protected readonly _gender = gender;
  protected readonly _maritalStatus = maritalStatus;
  configPerson: PersonConfig = new PersonConfig();
  public imageToken = "";
  public urlImage = "";

  constructor(
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
    private readonly fieldsService: FieldsService,
    public readonly translateService: TranslateService,
    private readonly toastService: ToastService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private readonly imageService: ImageUploadService,

  ) {
    this.personFormGroup = this.fieldsService.onCreateFormBuiderDynamic(this.configPerson.person);
  }


  ngOnInit(): void {
    const segments = this.route.snapshot.url;
    if(this.config.data){
      this.config.data.status = status.find(e => e.key === this.config.data.status);
      this.config.data.maritalStatus = this._maritalStatus.find(e => e.key === this.config.data.maritalStatus);
      this.config.data.gender = this._gender.find(e => e.key === this.config.data.gender);
      this.config.data.personalDocs.birthDate =  this.onConvertDate(this.config.data.personalDocs.birthDate);

      if(this.config.data.personMember) {
        this.config.data.personMember.entryDate =  this.onConvertDate(this.config.data.personMember?.entryDate);
        this.config.data.personMember.dateBaptism =  this.onConvertDate(this.config.data.personMember?.dateBaptism);
      }

      this.imageToken = this.config.data.image;
      this.personFormGroup.patchValue(this.config.data);
      this.onGetUrlImage();
    }
  }

  onConvertDate(data: any): Date | null{
    return data ? new Date(data) : null;
  }

  onSave() {
    if(this.personFormGroup.valid) {
      this.ref.close(this.configPerson.convertPersonToDTO(this.personFormGroup,this.datePipe, this.imageToken));
    }else {
      this.toastService.warn({summary: "Mensagem", detail: this.translateService.translate("common_message_invalid_fields")});
      this.fieldsService.verifyIsValid();
    }
  }

  onCancel() {
    this.ref.close(null);
  }

  public onGetTokenImage(image: any): void {
    this.imageToken = image;
  }

  public loading(): void {
  }

  private onGetUrlImage(){
    this.imageService.onRequestDonwload(this.imageToken).subscribe({
      next: (res) => {
        this.urlImage = res["url"];
      },
      error: error => {
        this.toastService.error({summary: "Mensagem", detail: "Falha ao fazer download da imagem"});
      }
    })
  }
}
