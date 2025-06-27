import {Component, OnInit, Type} from '@angular/core';
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {CalendarComponent} from "../../shared/components/calendar/calendar/calendar.component";
import {MobileViewComponent} from "../../shared/components/calendar/mobile-view/mobile-view.component";
import {Appointment, CalendarEvent} from "../../shared/interfaces/appointment.interface";
import {AppointmentComponent} from "../../components/appointment/appointment.component";
import {DialogService} from "primeng/dynamicdialog";


@Component({
  selector: 'app-scheduler',
  imports: [
    SharedCommonModule,
    CalendarComponent
  ],
  providers: [
    DialogService,
  ],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss'
})
export class SchedulerComponent implements OnInit {

  public currentDate = new Date();
  public appointments: CalendarEvent[] = [];
  public component: Type<any> = AppointmentComponent;

  constructor() {
  }

  ngOnInit(): void {

  }

}
