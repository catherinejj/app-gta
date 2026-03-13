export interface UpdateDepartmentDTO {
  id: string;
  name?: string;
  description?: string | null;
  isActive?: boolean;
}
