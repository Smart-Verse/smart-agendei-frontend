import {FormGroup} from "@angular/forms";
import {gerarCorHexAleatoria} from "../../shared/util/utils";
import {status} from "../../shared/util/constants";

export class ServiceConfig {

  fields: any[] = [
    {
      "fieldName": "id",
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "name",
      "required": true,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "description",
      "required": true,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "executionTime",
      "required": true,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "price",
      "required": true,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "status",
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "color",
      "required": true,
      "hidden": false,
      "type": "string"
    }
  ]

  convertFormGroupToDTO(formGroup: FormGroup): any {
    return {
      id: formGroup.get('id')?.value,
      name: formGroup.get('name')?.value,
      description: formGroup.get('description')?.value,
      executionTime: formGroup.get('executionTime')?.value,
      price: formGroup.get('price')?.value,
      color: formGroup.get('color')?.value,
      status: formGroup.get('status')?.value["key"],
    }
  }

  defaultValues(formGroup: FormGroup) {
    formGroup.get('status')?.setValue(status[0]);
    formGroup.get('executionTime')?.setValue(30);
    formGroup.get('color')?.setValue(gerarCorHexAleatoria());
    formGroup.get('price')?.setValue(0);
  }
}
