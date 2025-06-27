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


  // será removido
  loadAppointments(appointments: Appointment[]): void {
    const calendarEvents = appointments.map((appointment, index) => ({
      ...appointment,
      id: `appointment-${index}`,
      startTime: new Date(appointment.startDate),
      endTime: new Date(appointment.endDate),
      duration: this.calculateDuration(appointment.startDate, appointment.endDate)
    }));
    this.appointmentsSubject.next(calendarEvents);
  }

  onConvertAppointment(obj: any): Appointment[] {
    let appointments: Appointment[] = [];

    obj.forEach((item: any) => {

      const app: Appointment = {
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.service.name,
        userName: item.userName.name,
        cellColor: item.cellColor,
        clientName: item.client.name,
        status: item.status,
      };

      appointments.push(app);

    })

    return appointments;
  }

  private loadSampleData(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sampleAppointments: Appointment[] = [
      {
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0).toISOString(),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0).toISOString(),
        description: 'Team Meeting',
        userName: 'John Doe',
        cellColor: '#3B82F6'
      },
      {
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0).toISOString(),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0).toISOString(),
        description: 'Client Call',
        userName: 'Jane Smith',
        cellColor: '#10B981'
      },
      {
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0).toISOString(),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30).toISOString(),
        description: 'Project Review',
        userName: 'Mike Johnson',
        cellColor: '#F59E0B'
      },
      {
        startDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 0).toISOString(),
        endDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 12, 30).toISOString(),
        description: 'Daily Standup',
        userName: 'Sarah Wilson',
        cellColor: '#EF4444'
      }
    ];

    this.loadAppointments(sampleAppointments);
  }
}
