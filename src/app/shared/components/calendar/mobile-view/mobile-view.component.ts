import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarEvent} from "../../../interfaces/appointment.interface";
import {CalendarService} from "../../../services/calendar/calendar.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-mobile-view',
  imports: [CommonModule],
  templateUrl: './mobile-view.component.html',
  styleUrl: './mobile-view.component.scss'
})
export class MobileViewComponent implements OnInit{
  @Input() currentDate!: Date;
  @Input() appointments: CalendarEvent[] = [];
  @Output() eventClick = new EventEmitter<any>();

  currentAppointments: CalendarEvent[] = [];
  todayAppointments: CalendarEvent[] = [];
  upcomingAppointments: CalendarEvent[] = [];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.updateAppointments();
  }

  ngOnChanges() {
    this.updateAppointments();
  }

  private updateAppointments(): void {
    this.currentAppointments = this.calendarService.getAppointmentsForDate(this.currentDate);

    const today = new Date();
    this.todayAppointments = this.calendarService.getAppointmentsForDate(today);

    // Get upcoming appointments (next 7 days)
    this.upcomingAppointments = this.appointments.filter(appointment => {
      const appointmentDate = appointment.startTime;
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return appointmentDate > today && appointmentDate <= nextWeek;
    });
  }

  goToPrevious(): void {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() - 1);
    this.calendarService.setCurrentDate(newDate);
  }

  goToNext(): void {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + 1);
    this.calendarService.setCurrentDate(newDate);
  }

  goToToday(): void {
    this.calendarService.setCurrentDate(new Date());
  }

  formatCurrentDate(): string {
    return this.currentDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  formatCurrentDay(): string {
    return this.currentDate.toLocaleDateString('en-US', {
      weekday: 'long'
    });
  }

  getTimelineTitle(): string {
    const today = new Date();
    if (this.isSameDay(this.currentDate, today)) {
      return 'Today\'s Schedule';
    }
    return this.currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  getDurationText(appointment: CalendarEvent): string {
    const hours = Math.floor(appointment.duration / 60);
    const minutes = appointment.duration % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  }

  getAppointmentStatus(appointment: CalendarEvent): string {
    const now = new Date();

    if (appointment.endTime < now) {
      return 'completed';
    } else if (appointment.startTime <= now && appointment.endTime > now) {
      return 'ongoing';
    } else {
      return 'upcoming';
    }
  }

  getAppointmentStatusText(appointment: CalendarEvent): string {
    const status = this.getAppointmentStatus(appointment);
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'ongoing':
        return 'In Progress';
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Scheduled';
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  eventScheduler(obj: any) {
    this.eventClick.emit(obj);
  }
}
