import {FormGroup} from "@angular/forms";

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
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "executionTime",
      "required": false,
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
      "required": false,
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
}
