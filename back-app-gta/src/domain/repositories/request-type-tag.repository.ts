import { RequestTypeTag } from '../entities/request-type-tag.entity';

export interface RequestTypeTagRepository {
  findAll(): Promise<RequestTypeTag[]>;
  findByIds(requestTypeId: string, tagId: string): Promise<RequestTypeTag | null>;
  save(
    requestTypeTag: RequestTypeTag,
    currentKeys?: { requestTypeId: string; tagId: string },
  ): Promise<RequestTypeTag>;
  delete(requestTypeId: string, tagId: string): Promise<void>;
}
