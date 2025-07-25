import {EStatusAppointment} from "../util/enums";

export interface Appointment {
  id: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  description: string;
  userName: string;
  cellColor: string; // hex color
  clientName?: string;
  status?: EStatusAppointment;
  duration: number; // in minutes
}

export interface CalendarEvent extends Appointment {
  startTime: Date;
  endTime: Date;
}

export interface TimeSlot {
  hour: number;
  appointments: CalendarEvent[];
  appointmentLayers: CalendarEvent[][];
}

export type ViewMode = 'day' | 'week' | 'month';
