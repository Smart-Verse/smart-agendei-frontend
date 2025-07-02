import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarEvent} from "../../../interfaces/appointment.interface";
import {CalendarService} from "../../../services/calendar/calendar.service";
import {CommonModule} from "@angular/common";
import {EStatusAppointment} from "../../../util/enums";

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
  @Output() eventDelete = new EventEmitter<any>();

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
    return this.currentDate.toLocaleDateString('pt-BR', {
      month: 'short',
      day: 'numeric'
    });
  }

  formatCurrentDay(): string {
    return this.currentDate.toLocaleDateString('pt-BR', {
      weekday: 'long'
    });
  }

  getTimelineTitle(): string {
    const today = new Date();
    if (this.isSameDay(this.currentDate, today)) {
      return 'Programação de hoje';
    }
    return this.currentDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-BR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
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
    switch (appointment.status) {
      case EStatusAppointment.COMPLETED:
        return 'completed';
      case EStatusAppointment.APPOINTMENT_CONFIRMED:
        return 'confirmscheduled';
      case EStatusAppointment.SCHEDULED:
        return 'scheduled';
      case EStatusAppointment.NO_SHOW:
        return 'upcoming';
      default:
        return 'unknown';
    }
  }

  getAppointmentStatusText(appointment: CalendarEvent): string {
    const status = this.getAppointmentStatus(appointment);
    switch (status) {
      case 'completed':
        return 'Finalizado';
      case 'scheduled':
        return 'Agendado';
      case 'confirmscheduled':
        return 'Agendamento confirmado';
      case 'upcoming':
        return 'Não compareceu';
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

  onDelete(appointment: CalendarEvent) {
    if(event)
      event.stopPropagation();
    this.eventDelete.emit(appointment)
  }
}
