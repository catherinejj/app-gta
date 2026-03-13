export class RequestTag {
  private constructor(
    public readonly id: string,
    private codeValue: string,
    private labelValue: string,
    private colorValue: string | null,
    private createdAtValue: Date,
    private updatedAtValue: Date,
  ) {}

  static create(params: {
    id?: string;
    code: string;
    label: string;
    color?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }): RequestTag {
    const id = params.id?.trim() ?? '';
    const code = RequestTag.normalizeCode(params.code);
    const label = params.label?.trim() ?? '';
    const color = params.color?.trim() || null;
    const createdAt = params.createdAt ?? new Date();
    const updatedAt = params.updatedAt ?? new Date();

    if (!code) {
      throw new Error('Code is required');
    }

    if (!label) {
      throw new Error('Label is required');
    }

    return new RequestTag(id, code, label, color, createdAt, updatedAt);
  }

  get code(): string {
    return this.codeValue;
  }

  get label(): string {
    return this.labelValue;
  }

  get color(): string | null {
    return this.colorValue;
  }

  get createdAt(): Date {
    return this.createdAtValue;
  }

  get updatedAt(): Date {
    return this.updatedAtValue;
  }

  updateCode(code: string): void {
    const normalizedCode = RequestTag.normalizeCode(code);
    if (!normalizedCode) {
      throw new Error('Code is required');
    }
    this.codeValue = normalizedCode;
  }

  updateLabel(label: string): void {
    const normalizedLabel = label?.trim() ?? '';
    if (!normalizedLabel) {
      throw new Error('Label is required');
    }
    this.labelValue = normalizedLabel;
  }

  updateColor(color: string | null | undefined): void {
    this.colorValue = color?.trim() || null;
  }

  private static normalizeCode(code: string): string {
    return code?.trim().toUpperCase() ?? '';
  }
}
