export interface Appointment {
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  description: string;
  userName: string;
  cellColor: string; // hex color
}

export interface CalendarEvent extends Appointment {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
}

export interface TimeSlot {
  hour: number;
  appointments: CalendarEvent[];
  appointmentLayers: CalendarEvent[][];
}

export type ViewMode = 'day' | 'week' | 'month';
