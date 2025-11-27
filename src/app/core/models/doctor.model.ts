export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  fee: number;
  experienceYears: number;
  availableSlots: string[];
  availableDays: string[];
}
