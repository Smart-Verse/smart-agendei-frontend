import {FormGroup} from "@angular/forms";

export class AppointmentConfig {
  fields: any[] = [
    {
      "fieldName": "id",
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "client",
      "required": true,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "service",
      "required": true,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "startDate",
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "endDate",
      "required": false,
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
      "fieldName": "userName",
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "cellColor",
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "extras",
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "extra",
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "status",
      "required": true,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "value",
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "valueExtras",
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "discount",
      "required": false,
      "hidden": false,
      "type": "string"
    },
    {
      "fieldName": "total",
      "required": false,
      "hidden": false,
      "type": "string"
    }
  ];


  convertFormGroupToDTO(formGroup: FormGroup, extras: any[]): any {
    return {
      id: formGroup.get('id')?.value,
      client: formGroup.get('client')?.value,
      service: formGroup.get('service')?.value,
      startDate: formGroup.get('startDate')?.value,
      endDate: formGroup.get('endDate')?.value,
      description: formGroup.get('description')?.value,
      userName: formGroup.get('userName')?.value,
      cellColor: formGroup.get('cellColor')?.value,
      discount: formGroup.get('discount')?.value,
      total: formGroup.get('total')?.value,
      extras: extras,
      status: formGroup.get('status')?.value["key"],
    }
  }
}
