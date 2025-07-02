import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Appointment, CalendarEvent, ViewMode} from "../../interfaces/appointment.interface";
import {CrudService} from "../crud/crud.service";
import {RequestData} from "../../components/request-data";

@Injectable({ providedIn: 'root' })
export class CalendarService {
  private currentDateSubject = new BehaviorSubject<Date>(new Date());
  private viewModeSubject = new BehaviorSubject<ViewMode>('month');
  private appointmentsSubject = new BehaviorSubject<CalendarEvent[]>([]);

  currentDate$ = this.currentDateSubject.asObservable();
  viewMode$ = this.viewModeSubject.asObservable();
  appointments$ = this.appointmentsSubject.asObservable();

  constructor(
    private readonly crudService: CrudService
  ) {
  }

  setCurrentDate(date: Date): void {
    this.currentDateSubject.next(date);
  }

  setViewMode(mode: ViewMode): void {
    this.viewModeSubject.next(mode);
  }


  getAppointmentsForDate(date: Date): CalendarEvent[] {
    const appointments = this.appointmentsSubject.value;
    return appointments.filter(appointment =>
      this.isSameDay(appointment.startTime, date) ||
      this.isDateInRange(date, appointment.startTime, appointment.endTime)
    );
  }

  getAppointmentsForWeek(weekStart: Date): CalendarEvent[] {
    const appointments = this.appointmentsSubject.value;
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return appointments.filter(appointment =>
      this.isDateInRange(appointment.startTime, weekStart, weekEnd) ||
      this.isDateInRange(appointment.endTime, weekStart, weekEnd) ||
      (appointment.startTime < weekStart && appointment.endTime > weekEnd)
    );
  }

  private calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  private isDateInRange(date: Date, start: Date, end: Date): boolean {
    return date >= start && date <= end;
  }

  loadAppointments(appointments: Appointment[]): void {
    const calendarEvents = appointments.map((appointment, index) => ({
      ...appointment,
      startTime: new Date(appointment.startDate),
      endTime: new Date(appointment.endDate)
    }));
    this.appointmentsSubject.next(calendarEvents);
  }

  onConvertAppointment(obj: any): Appointment[] {
    let appointments: Appointment[] = [];

    obj.forEach((item: any) => {

      const app: Appointment = {
        id: item.id,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description,
        userName: item.userName.name,
        cellColor: item.cellColor,
        clientName: item.client.name,
        status: item.status,
        duration: this.calculateDuration(item.startDate, item.endDate)
      };

      appointments.push(app);

    })

    return appointments;
  }
}
