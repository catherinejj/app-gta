export interface RequestTypeTagViewDTO {
  requestTypeId: string;
  tagId: string;
}

export function toRequestTypeTagView(requestTypeTag: {
  requestTypeId: string;
  tagId: string;
}): RequestTypeTagViewDTO {
  return {
    requestTypeId: requestTypeTag.requestTypeId,
    tagId: requestTypeTag.tagId,
  };
}
