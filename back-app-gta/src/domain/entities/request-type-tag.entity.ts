export class RequestTypeTag {
  private constructor(
    private requestTypeIdValue: string,
    private tagIdValue: string,
  ) {}

  static create(params: {
    requestTypeId: string;
    tagId: string;
  }): RequestTypeTag {
    const requestTypeId = params.requestTypeId?.trim() ?? '';
    const tagId = params.tagId?.trim() ?? '';

    RequestTypeTag.validateRequestTypeId(requestTypeId);
    RequestTypeTag.validateTagId(tagId);

    return new RequestTypeTag(requestTypeId, tagId);
  }

  get requestTypeId(): string {
    return this.requestTypeIdValue;
  }

  get tagId(): string {
    return this.tagIdValue;
  }

  updateRequestTypeId(requestTypeId: string): void {
    const normalizedRequestTypeId = requestTypeId?.trim() ?? '';
    RequestTypeTag.validateRequestTypeId(normalizedRequestTypeId);
    this.requestTypeIdValue = normalizedRequestTypeId;
  }

  updateTagId(tagId: string): void {
    const normalizedTagId = tagId?.trim() ?? '';
    RequestTypeTag.validateTagId(normalizedTagId);
    this.tagIdValue = normalizedTagId;
  }

  private static validateRequestTypeId(requestTypeId: string): void {
    if (!requestTypeId) {
      throw new Error('Request type id is required');
    }
  }

  private static validateTagId(tagId: string): void {
    if (!tagId) {
      throw new Error('Tag id is required');
    }
  }
}
