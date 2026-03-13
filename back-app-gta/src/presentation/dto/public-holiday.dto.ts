export interface CreatePublicHolidayDto {
  date: string;
  label: string;
  region?: string | null;
  isRecurring?: boolean;
}

export interface UpdatePublicHolidayDto {
  date?: string;
  label?: string;
  region?: string | null;
  isRecurring?: boolean;
}
