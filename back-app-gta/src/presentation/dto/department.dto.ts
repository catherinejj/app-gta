export interface CreateDepartmentDto {
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export interface UpdateDepartmentDto {
  name?: string;
  description?: string | null;
  isActive?: boolean;
}
