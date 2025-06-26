import {FormGroup} from "@angular/forms";

export class ServiceConfig {

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
      "fieldName": "description",
      "required": false,
      "hidden": false,
      "type": "string",
      "fields": []
    },
    {
      "fieldName": "executionTime",
      "required": false,
      "hidden": false,
      "type": "string",
      "fields": []
    },
    {
      "fieldName": "price",
      "required": true,
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
      description: formGroup.get('description')?.value,
      executionTime: formGroup.get('executionTime')?.value,
      price: formGroup.get('price')?.value,
      status: formGroup.get('status')?.value["key"],
    }
  }
}
