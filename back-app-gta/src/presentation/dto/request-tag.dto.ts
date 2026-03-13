export interface CreateRequestTagDto {
  code: string;
  label: string;
  color?: string | null;
}

export interface UpdateRequestTagDto {
  code?: string;
  label?: string;
  color?: string | null;
}
