export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Cancelled';

export interface Appointment {
  id?: number;
  patientId: number;
  doctorId: number;
  date: string; // yyyy-MM-dd
  time: string; // '10:30'
  notes?: string;
  status?: AppointmentStatus;
  createdAt?: string;
}
