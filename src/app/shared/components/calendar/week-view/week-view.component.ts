import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent} from "../../../interfaces/appointment.interface";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-week-view',
  imports: [CommonModule],
  templateUrl: './week-view.component.html',
  styleUrl: './week-view.component.scss'
})
export class WeekViewComponent implements OnInit {
  @Input() currentDate!: Date;
  @Input() appointments: CalendarEvent[] = [];

  weekDays: Date[] = [];
  hours: number[] = [];

  ngOnInit() {
    this.generateWeekDays();
    this.generateHours();
  }

  ngOnChanges() {
    this.generateWeekDays();
  }

  private generateWeekDays(): void {
    const startOfWeek = new Date(this.currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.weekDays.push(day);
    }
  }

  private generateHours(): void {
    this.hours = Array.from({ length: 24 }, (_, i) => i);
  }

  getAppointmentsForDayHour(day: Date, hour: number): CalendarEvent[] {
    return this.appointments.filter(appointment => {
      const isSameDay = this.isSameDay(appointment.startTime, day);
      const startHour = appointment.startTime.getHours();
      const endHour = appointment.endTime.getHours();
      const endMinutes = appointment.endTime.getMinutes();

      return isSameDay &&
        startHour <= hour &&
        (endHour > hour || (endHour === hour && endMinutes > 0));
    });
  }

  getAppointmentHeight(appointment: CalendarEvent): number {
    const duration = appointment.duration;
    return Math.max((duration / 60) * 60, 20);
  }

  getAppointmentTop(appointment: CalendarEvent): number {
    const minutes = appointment.startTime.getMinutes();
    return (minutes / 60) * 60;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return this.isSameDay(date, today);
  }

  isCurrentHour(day: Date, hour: number): boolean {
    const now = new Date();
    return this.isSameDay(day, now) && now.getHours() === hour;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  formatDayName(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  formatHour(hour: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour} ${period}`;
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
