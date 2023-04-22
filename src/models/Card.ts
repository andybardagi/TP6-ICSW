export class Card {
  constructor(
    public readonly cardNumber: string,
    public readonly cardHolderName: string,
    public readonly expirationMonth: string,
    public readonly expirationYear: string,
    public readonly cvv: string
  ) {}
}
