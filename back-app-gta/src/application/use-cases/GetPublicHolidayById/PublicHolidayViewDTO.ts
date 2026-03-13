import type { UserRole } from '../../../domain/value-objects/user-role';

export interface PublicHolidayViewDTO {
  id: string;
  date: string;
  label: string;
  region: string | null;
  isRecurring: boolean;
  createdAt: string;
}

export function toPublicHolidayView(holiday: {
  id: string;
  date: Date;
  label: string;
  region: string | null;
  isRecurring: boolean;
  createdAt: Date;
}): PublicHolidayViewDTO {
  return {
    id: holiday.id,
    date: holiday.date.toISOString(),
    label: holiday.label,
    region: holiday.region,
    isRecurring: holiday.isRecurring,
    createdAt: holiday.createdAt.toISOString(),
  };
}
