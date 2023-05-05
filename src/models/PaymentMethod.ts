import { Card } from '@/models/Card';

export const enum PaymentType {
  Card = 'card',
  Cash = 'cash'
}

export class PaymentMethod {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly paymentType: string,
    public readonly card?: Card
  ) {}
}
