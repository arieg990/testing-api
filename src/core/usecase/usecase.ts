export class Usecase<T> {
  constructor(private readonly useCase: T) {}
  getInstance(): T {
    return this.useCase;
  }
}
