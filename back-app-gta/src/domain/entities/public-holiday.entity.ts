export class PublicHoliday {
  private constructor(
    public readonly id: string,
    private dateValue: Date,
    private labelValue: string,
    private regionValue: string | null,
    private isRecurringValue: boolean,
    private createdAtValue: Date,
  ) {}

  static create(params: {
    id?: string;
    date: Date;
    label: string;
    region?: string | null;
    isRecurring?: boolean;
    createdAt?: Date;
  }): PublicHoliday {
    const id = params.id?.trim() ?? '';
    const date = params.date;
    const label = PublicHoliday.normalizeWord(params.label);
    const region = params.region?.trim() || null;
    const isRecurring = params.isRecurring ?? false;
    const createdAt = params.createdAt ?? new Date();

    if (!date) {
      throw new Error('Date is required');
    }

    if (!label) {
      throw new Error('Label is required');
    }

    return new PublicHoliday(id, date, label, region, isRecurring, createdAt);
  }

  get date(): Date {
    return this.dateValue;
  }

  get label(): string {
    return this.labelValue;
  }

  get region(): string | null {
    return this.regionValue;
  }

  get isRecurring(): boolean {
    return this.isRecurringValue;
  }

  get createdAt(): Date {
    return this.createdAtValue;
  }

  updateDate(date: Date): void {
    if (!date) {
      throw new Error('Date is required');
    }
    this.dateValue = date;
  }

  updateLabel(label: string): void {
    const normalizedLabel = PublicHoliday.normalizeWord(label);
    if (!normalizedLabel) {
      throw new Error('Label is required');
    }
    this.labelValue = normalizedLabel;
  }

  updateRegion(region: string | null): void {
    this.regionValue = region?.trim() || null;
  }

  updateIsRecurring(isRecurring: boolean): void {
    this.isRecurringValue = isRecurring;
  }

  private static normalizeWord(word: string): string {
    return word?.trim().toLowerCase() ?? '';
  }
}
