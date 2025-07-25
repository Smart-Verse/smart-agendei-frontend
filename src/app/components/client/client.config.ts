import {FormGroup} from "@angular/forms";
import {status} from "../../shared/util/constants";
import {gerarCorHexAleatoria} from "../../shared/util/utils";

export class ClientConfig {

  fields: any[] = [
    {
      "fieldName": "id",
      "required": false,
      "hidden": false,
      "type": "string",
      "fields": []
    },
    {
      "fieldName": "name",
      "required": true,
      "hidden": false,
      "type": "string",
      "fields": []
    },
    {
      "fieldName": "birthDate",
      "required": false,
      "hidden": false,
      "type": "string",
      "fields": []
    },
    {
      "fieldName": "cpf",
      "required": false,
      "hidden": false,
      "type": "string",
      "fields": []
    },
    {
      "fieldName": "phone",
      "required": true,
      "hidden": false,
      "type": "string",
      "fields": []
    },
    {
      "fieldName": "email",
      "required": false,
      "hidden": false,
      "type": "string",
      "fields": []
    },
    {
      "fieldName": "status",
      "required": false,
      "hidden": false,
      "type": "string",
      "fields": []
    }
  ]

  convertFormGroupToDTO(formGroup: FormGroup): any {
    return {
      id: formGroup.get('id')?.value,
      name: formGroup.get('name')?.value,
      birthDate: formGroup.get('birthDate')?.value,
      cpf: formGroup.get('cpf')?.value,
      phone: formGroup.get('phone')?.value,
      email: formGroup.get('email')?.value,
      status: formGroup.get('status')?.value["key"],
    }
  }

  defaultValues(formGroup: FormGroup) {
    formGroup.get('status')?.setValue(status[0]);
  }
}
