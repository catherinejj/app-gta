export interface CreatePublicHolidayDTO {
  date: string;
  label: string;
  region?: string | null;
  isRecurring?: boolean;
}
