import { PaymentMethod, PaymentType } from '@/models/PaymentMethod';

export const paymentMethodArray: PaymentMethod[] = [
  {
    id: '1',
    name: 'Efectivo',
    paymentType: PaymentType.Cash
  },
  {
    id: '2',
    name: 'Tarjeta',
    paymentType: PaymentType.Card,
    card: {
      cardNumber: '',
      cardHolderName: '',
      expirationMonth: '',
      expirationYear: '',
      cvc: ''
    }
  }
];
