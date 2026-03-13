export interface RequestTagViewDTO {
  id: string;
  code: string;
  label: string;
  color: string | null;
  createdAt: string;
  updatedAt: string;
}

export function toRequestTagView(requestTag: {
  id: string;
  code: string;
  label: string;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;
}): RequestTagViewDTO {
  return {
    id: requestTag.id,
    code: requestTag.code,
    label: requestTag.label,
    color: requestTag.color,
    createdAt: requestTag.createdAt.toISOString(),
    updatedAt: requestTag.updatedAt.toISOString(),
  };
}
