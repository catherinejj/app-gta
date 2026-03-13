import { Department } from '../entities/department.entity';

export interface DepartmentRepository {
  findAll(): Promise<Department[]>;
  findById(id: string): Promise<Department | null>;
  findByName(name: string): Promise<Department | null>;
  save(department: Department): Promise<Department>;
  delete(id: string): Promise<void>;
}
