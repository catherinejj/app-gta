import { RequestTag } from '../entities/request-tag.entity';

export interface RequestTagRepository {
  findAll(): Promise<RequestTag[]>;
  findById(id: string): Promise<RequestTag | null>;
  findByCode(code: string): Promise<RequestTag | null>;
  save(requestTag: RequestTag): Promise<RequestTag>;
  delete(id: string): Promise<void>;
}
