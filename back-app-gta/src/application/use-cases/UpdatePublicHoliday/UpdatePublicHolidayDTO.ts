export interface UpdatePublicHolidayDTO {
  id: string;
  date?: string;
  label?: string;
  region?: string | null;
  isRecurring?: boolean;
}
