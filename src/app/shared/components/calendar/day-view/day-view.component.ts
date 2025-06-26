import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent, TimeSlot} from "../../../interfaces/appointment.interface";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-day-view',
  imports: [CommonModule],
  templateUrl: './day-view.component.html',
  styleUrl: './day-view.component.scss'
})
export class DayViewComponent implements OnInit{
  @Input() currentDate!: Date;
  @Input() appointments: CalendarEvent[] = [];

  timeSlots: TimeSlot[] = [];

  ngOnInit() {
    this.generateTimeSlots();
  }

  ngOnChanges() {
    this.generateTimeSlots();
  }

  private generateTimeSlots(): void {
    this.timeSlots = [];

    for (let hour = 0; hour < 24; hour++) {
      const slotAppointments = this.getAppointmentsForHour(hour);
      const appointmentLayers = this.organizeAppointmentsInLayers(slotAppointments);

      this.timeSlots.push({
        hour,
        appointments: slotAppointments,
        appointmentLayers
      });
    }
  }

  private getAppointmentsForHour(hour: number): CalendarEvent[] {
    return this.appointments.filter(appointment => {
      const startHour = appointment.startTime.getHours();
      const endHour = appointment.endTime.getHours();
      const startMinutes = appointment.startTime.getMinutes();
      const endMinutes = appointment.endTime.getMinutes();

      return (startHour <= hour && (endHour > hour || (endHour === hour && endMinutes > 0))) ||
        (startHour === hour && startMinutes > 0);
    });
  }

  private organizeAppointmentsInLayers(appointments: CalendarEvent[]): CalendarEvent[][] {
    if (appointments.length === 0) return [];

    const sortedAppointments = [...appointments].sort((a, b) =>
      a.startTime.getTime() - b.startTime.getTime()
    );

    const layers: CalendarEvent[][] = [];

    for (const appointment of sortedAppointments) {
      let placed = false;

      for (const layer of layers) {
        const hasConflict = layer.some(existing =>
          this.appointmentsOverlap(appointment, existing)
        );

        if (!hasConflict) {
          layer.push(appointment);
          placed = true;
          break;
        }
      }

      if (!placed) {
        layers.push([appointment]);
      }
    }

    return layers;
  }

  private appointmentsOverlap(a: CalendarEvent, b: CalendarEvent): boolean {
    return a.startTime < b.endTime && a.endTime > b.startTime;
  }

  getAppointmentHeight(appointment: CalendarEvent): number {
    const duration = appointment.duration;
    return Math.max((duration / 60) * 60, 20); // Minimum 20px height
  }

  getAppointmentTop(appointment: CalendarEvent): number {
    const minutes = appointment.startTime.getMinutes();
    return (minutes / 60) * 60;
  }

  getAppointmentWidth(layerSize: number): number {
    return 100 / layerSize;
  }

  getAppointmentLeft(index: number, layerSize: number): number {
    return (index / layerSize) * 100;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatHour(hour: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
