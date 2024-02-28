export interface Write<T> {
  create(item: T | any): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  remove(id: string): Promise<boolean>;
}

export interface Read<T> {
  findAll(
    filter?: object,
    protections?: string,
    options?: object,
  ): Promise<T[]>;
  findOne(id: string): Promise<T>;
}

export interface BaseServiceInterface<T> extends Write<T>, Read<T> {}
