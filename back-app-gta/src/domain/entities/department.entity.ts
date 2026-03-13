export class Department {
  private constructor(
    public readonly id: string,
    private nameValue: string,
    private descriptionValue: string | null,
    private isActiveValue: boolean,
    private createdAtValue: Date,
    private updatedAtValue: Date,
  ) {}

  static create(params: {
    id?: string;
    name: string;
    description?: string | null;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }): Department {
    const id = params.id?.trim() ?? '';
    const name = params.name?.trim() ?? '';
    const description = params.description?.trim() || null;
    const isActive = params.isActive ?? true;
    const createdAt = params.createdAt ?? new Date();
    const updatedAt = params.updatedAt ?? new Date();

    if (!name) {
      throw new Error('Name is required');
    }

    return new Department(id, name, description, isActive, createdAt, updatedAt);
  }

  get name(): string {
    return this.nameValue;
  }

  get description(): string | null {
    return this.descriptionValue;
  }

  get isActive(): boolean {
    return this.isActiveValue;
  }

  get createdAt(): Date {
    return this.createdAtValue;
  }

  get updatedAt(): Date {
    return this.updatedAtValue;
  }

  updateName(name: string): void {
    const normalizedName = name?.trim() ?? '';
    if (!normalizedName) {
      throw new Error('Name is required');
    }
    this.nameValue = normalizedName;
  }

  updateDescription(description: string | null | undefined): void {
    this.descriptionValue = description?.trim() || null;
  }

  updateIsActive(isActive: boolean): void {
    this.isActiveValue = isActive;
  }
}
