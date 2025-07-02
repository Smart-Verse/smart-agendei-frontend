import {FormGroup} from "@angular/forms";
import {convertDateMinute} from "../../shared/util/utils";
import {status, statusAppointment} from "../../shared/util/constants";

export interface Extras {
  id?: string
  service: any;
  appointment?: any;
}

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


  convertFormGroupToDTO(formGroup: FormGroup, extras: any[], userData: any): any {
    let obj = {
      id: formGroup.get('id')?.value,
      client: formGroup.get('client')?.value,
      service: formGroup.get('service')?.value,
      startDate: formGroup.get('startDate')?.value,
      endDate: formGroup.get('endDate')?.value,
      description: formGroup.get('description')?.value,
      userName: userData,
      cellColor: formGroup.get('cellColor')?.value,
      discount: formGroup.get('discount')?.value,
      total: formGroup.get('total')?.value,
      extras: this.onConvertExtras(extras),
      status: formGroup.get('status')?.value["key"],
    }

    obj.cellColor = obj.service.color;
    if(!obj.discount) obj.discount = 0;
    obj.userName = userData;

    // corrige fuso datas
    obj.startDate = convertDateMinute(obj.startDate);
    obj.endDate = convertDateMinute(obj.endDate);

    return obj;
  }

  onConvertExtras(extras: any): Extras[]{
    let obj: Extras[] = [];
    extras.forEach((extra: any) => {
      obj.push({service: extra})
    })
    return obj;
  }

  defaultValues(formGroup: FormGroup) {
    formGroup.get('status')?.setValue(statusAppointment[0]);
    formGroup.get('startDate')?.setValue(new Date());
    formGroup.get('endDate')?.setValue(new Date(new Date().getTime() + 60 * 60 * 1000));

  }
}
