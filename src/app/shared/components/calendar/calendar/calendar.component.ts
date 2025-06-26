import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DayViewComponent} from "../day-view/day-view.component";
import {WeekViewComponent} from "../week-view/week-view.component";
import {MonthViewComponent} from "../month-view/month-view.component";
import {MobileViewComponent} from "../mobile-view/mobile-view.component";
import {combineLatest, Subject, takeUntil} from "rxjs";
import {CalendarEvent, ViewMode} from "../../../interfaces/appointment.interface";
import {CalendarService} from "../../../services/calendar/calendar.service";

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, DayViewComponent, WeekViewComponent, MonthViewComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit, OnDestroy  {
  private destroy$ = new Subject<void>();

  currentDate: Date = new Date();
  currentViewMode: ViewMode = 'month';
  currentAppointments: CalendarEvent[] = [];
  appointments: CalendarEvent[] = [];
  isMobileView: boolean = false;

  viewModes: ViewMode[] = ['day', 'week', 'month'];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    combineLatest([
      this.calendarService.currentDate$,
      this.calendarService.viewMode$,
      this.calendarService.appointments$
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([date, viewMode, appointments]) => {
      this.currentDate = date;
      this.currentViewMode = viewMode;
      this.appointments = appointments;
      this.updateCurrentAppointments(appointments);
    });
    console.log("chegou aqui");
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateCurrentAppointments(appointments: CalendarEvent[]) {
    switch (this.currentViewMode) {
      case 'day':
        this.currentAppointments = this.calendarService.getAppointmentsForDate(this.currentDate);
        break;
      case 'week':
        const weekStart = this.getWeekStart(this.currentDate);
        this.currentAppointments = this.calendarService.getAppointmentsForWeek(weekStart);
        break;
      case 'month':
        this.currentAppointments = appointments.filter(appointment =>
          appointment.startTime.getMonth() === this.currentDate.getMonth() &&
          appointment.startTime.getFullYear() === this.currentDate.getFullYear()
        );
        break;
    }
  }

  setViewMode(mode: ViewMode) {
    this.calendarService.setViewMode(mode);
  }

  toggleMobileView() {
    this.isMobileView = !this.isMobileView;
  }

  goToPrevious() {
    const newDate = new Date(this.currentDate);

    switch (this.currentViewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
    }

    this.calendarService.setCurrentDate(newDate);
  }

  goToNext() {
    const newDate = new Date(this.currentDate);

    switch (this.currentViewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
    }

    this.calendarService.setCurrentDate(newDate);
  }

  goToToday() {
    this.calendarService.setCurrentDate(new Date());
  }

  getCurrentPeriodTitle(): string {
    switch (this.currentViewMode) {
      case 'day':
        return this.currentDate.toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'week':
        const weekStart = this.getWeekStart(this.currentDate);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return `${weekStart.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      case 'month':
        return this.currentDate.toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long'
        });
      default:
        return '';
    }
  }

  private getWeekStart(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    start.setDate(start.getDate() - day);
    return start;
  }
}
