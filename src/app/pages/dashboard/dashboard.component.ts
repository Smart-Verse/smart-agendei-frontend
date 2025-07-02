import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../../shared/services/calendar/calendar.service";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {Router} from "@angular/router";
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {LoadingService} from "../../shared/services/loading/loading.service";
import {Appointment} from "../../shared/interfaces/appointment.interface";
import {gerarCorHexAleatoria} from "../../shared/util/utils";

interface TopClients {
  name: string;
  appointments: Number;
  color: string;
  phone: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [ SharedCommonModule],
  providers: [
    DashboardService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  todayStats = 0;
  weekStats = 0;
  upcomingStats = 0;
  clientStats = 0;
  todayAppointments: Appointment[] = [];

  topClients:TopClients[] = [];
  recentActivities = [];
  currentCalendarDate = new Date();
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  calendarDates: Date[] = [];

  constructor(
    private calendarService: CalendarService,
    private router: Router,
    private dashboardService: DashboardService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.generateCalendarDates();
    this.onLoadData();
  }

  onLoadData() {
    this.loadingService.showLoading.next(true);
    this.dashboardService.dashboard().subscribe({
      next: (res) => {
        this.todayStats = res.countAppointmentToday;
        this.clientStats = res.countClientsActive;
        this.weekStats = res.countAppointmentCompletedWeek;
        this.upcomingStats = res.countAppointmentPendingConfirmation;
        this.todayAppointments = this.calendarService.onConvertAppointment(res.appointemntsToday);
        this.onSetClients(res.topClients);
        this.loadingService.showLoading.next(false);
      },
      error: (err) => {
        this.loadingService.showLoading.next(false);
      }
    });
  }

  onSetClients(obj: any) {

    obj.forEach((item: any) => {
      let client: TopClients = {
        name: item.client.name,
        color: gerarCorHexAleatoria(),
        appointments: item.count,
        phone: item.client.phone,
      }
      this.topClients.push(client);
    })
  }

  onActionMenu(route: string) {
    let rout = route.split("/");
    if(rout.length > 1) {
      let arrRout = ['home'].concat(rout);
      this.router.navigate(arrRout);
    } else {
      this.router.navigate(['home',route]);
    }

  }

  getCurrentDateText(): string {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(dateStr: string): string {
    let date = new Date(dateStr);
    return date.toLocaleTimeString('pt-BR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
  }

  getDurationText(appointment: any): string {
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

  getAppointmentStatus(appointment: any): string {
    const now = new Date();

    if (appointment.endTime < now) {
      return 'completed';
    } else if (appointment.startTime <= now && appointment.endTime > now) {
      return 'ongoing';
    } else {
      return 'upcoming';
    }
  }

  getClientInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  openFullCalendar(): void {
    // Emit event or navigate to full calendar
    console.log('Opening full calendar...');
  }

  // Mini calendar methods
  getCurrentMonthYear(): string {
    return this.currentCalendarDate.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric'
    });
  }

  previousMonth(): void {
    this.currentCalendarDate = new Date(
      this.currentCalendarDate.getFullYear(),
      this.currentCalendarDate.getMonth() - 1,
      1
    );
    this.generateCalendarDates();
  }

  nextMonth(): void {
    this.currentCalendarDate = new Date(
      this.currentCalendarDate.getFullYear(),
      this.currentCalendarDate.getMonth() + 1,
      1
    );
    this.generateCalendarDates();
  }

  private generateCalendarDates(): void {
    const year = this.currentCalendarDate.getFullYear();
    const month = this.currentCalendarDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDates = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      this.calendarDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentCalendarDate.getMonth();
  }

  hasAppointments(date: Date): boolean {
    // This would check against actual appointment data
    return Math.random() > 0.7; // Random for demo
  }

}
