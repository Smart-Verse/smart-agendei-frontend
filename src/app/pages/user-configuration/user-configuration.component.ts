import {Component, OnInit} from '@angular/core';
import {UserConfigurationConfig} from "./user-configuration.config";
import {FormGroup} from "@angular/forms";
import {language, theme} from "../../shared/util/constants";
import {TranslateService} from "../../shared/services/translate/translate.service";
import {FieldsService} from "../../shared/services/fields/fields.service";
import {ToastService} from "../../shared/services/toast/toast.service";
import {ImageUploadService} from "../../shared/components/inputs/image-upload/image-upload.service";
import {ThemeService} from "../../shared/services/theme/theme.service";
import {BaseComponent} from "../../shared/common/base-component";
import {UserConfigurationService} from "../../services/user-configuration/user-configuration.service";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {LoadingService} from "../../shared/services/loading/loading.service";

@Component({
  selector: 'app-user-configuration',
  standalone: true,
  imports: [
    SharedCommonModule,
  ],
  providers: [
    UserConfigurationService,
    ToastService,
    ThemeService
  ],
  templateUrl: './user-configuration.component.html',
  styleUrl: './user-configuration.component.scss'
})
export class UserConfigurationComponent extends BaseComponent implements OnInit  {

  public imageToken = "";
  public urlImage = "";
  public formGroup: FormGroup;
  configuration: UserConfigurationConfig = new UserConfigurationConfig();
  protected readonly _theme = theme;
  protected readonly _language = language;

  constructor(
    public readonly translateService: TranslateService,
    private readonly fieldsService: FieldsService,
    private readonly toastService: ToastService,
    private readonly userConfigurationService: UserConfigurationService,
    private readonly imageService: ImageUploadService,
    private readonly  themeService: ThemeService,
    private readonly loadingService: LoadingService
  ) {
    super();
    this.formGroup = this.fieldsService.onCreateFormBuiderDynamic(this.configuration.fields);
  }

  ngOnInit(): void {
    this.onGetUserConfiguration();
  }

  public onSave(): void {
    if(this.formGroup.valid){
      this.loadingService.showLoading.next(true);
      let dto = this.configuration.convertToDTO(this.formGroup, this.imageToken);
      this.userConfigurationService.onUpdate(dto.id, dto).subscribe({
        next: data => {
          this.themeService.onConfigurationTheme(dto.theme);
          this.loadingService.showLoading.next(false);
          this.translateService.loadTranslationsUser(dto.lang);
          this.toastService.success({summary: this.translateService.translate("common_message"), detail: this.translateService.translate("common_message_success")});
        },
        error: error => {
          this.loadingService.showLoading.next(false);
        }
      })
    }
  }

  public onGetUserConfiguration(){
    this.loadingService.showLoading.next(true);
    this.userConfigurationService.getUser().subscribe({
      next: (res) => {
        res.output.theme = this._theme.find(e => e.key === res.output.theme);
        res.output.lang = this._language.find(e => e.key === res.output.lang);
        //this.imageToken = res.output.userPhoto;
        this.formGroup.patchValue(res.output);
        this.loadingService.showLoading.next(false);
        //this.onGetUrlImage();
      },
      error: (err) => {
        this.loadingService.showLoading.next(false);
      }
    });
  }

  private onGetUrlImage(){

    this.imageService.onRequestDonwload(this.imageToken).subscribe({
      next: (res) => {
        this.urlImage = res["url"];
        this.loadingService.showLoading.next(false);
      },
      error: error => {
        this.loadingService.showLoading.next(false);
        this.toastService.error({summary: "Mensagem", detail: "Falha ao fazer download da imagem"});
      }
    })
  }

  public onGetTokenImage(image: any): void {
    this.imageToken = image;
  }

}
