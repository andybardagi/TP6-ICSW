export class PaymentResult {
  constructor(
    public readonly result: string,
    public readonly error?: string,
  ) {}
}
