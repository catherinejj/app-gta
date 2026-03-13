import { RequestType } from '../entities/request-type.entity';

export interface RequestTypeRepository {
  findAll(): Promise<RequestType[]>;
  findById(id: string): Promise<RequestType | null>;
  findByCode(code: string): Promise<RequestType | null>;
  save(requestType: RequestType): Promise<RequestType>;
  delete(id: string): Promise<void>;
}
