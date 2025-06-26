import {Component, OnInit} from '@angular/core';
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {CalendarComponent} from "../../shared/components/calendar/calendar/calendar.component";
import {MobileViewComponent} from "../../shared/components/calendar/mobile-view/mobile-view.component";
import {Appointment, CalendarEvent} from "../../shared/interfaces/appointment.interface";


@Component({
  selector: 'app-scheduler',
  imports: [SharedCommonModule, MobileViewComponent],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss'
})
export class SchedulerComponent implements OnInit {

  public currentDate = new Date();
  public appointments: CalendarEvent[] = [];

  constructor() {
  }

  ngOnInit(): void {

  }

}
