import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent} from "../../../interfaces/appointment.interface";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-month-view',
  imports: [CommonModule],
  templateUrl: './month-view.component.html',
  styleUrl: './month-view.component.scss'
})
export class MonthViewComponent implements OnInit{
  @Input() currentDate!: Date;
  @Input() appointments: CalendarEvent[] = [];

  weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarWeeks: Date[][] = [];

  ngOnInit() {
    this.generateCalendarWeeks();
  }

  ngOnChanges() {
    this.generateCalendarWeeks();
  }

  private generateCalendarWeeks(): void {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

    this.calendarWeeks = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.calendarWeeks.push(week);
    }
  }

  getDayAppointments(day: Date): CalendarEvent[] {
    return this.appointments.filter(appointment =>
      this.isSameDay(appointment.startTime, day) ||
      (appointment.startTime <= day && appointment.endTime >= day)
    );
  }

  getAppointmentTooltip(appointment: CalendarEvent): string {
    return `${appointment.description}\n${appointment.userName}\n${this.formatTime(appointment.startTime)} - ${this.formatTime(appointment.endTime)}`;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return this.isSameDay(date, today);
  }

  isSameMonth(date: Date, currentDate: Date): boolean {
    return date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth();
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
