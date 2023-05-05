import { PaymentType } from '@/models/PaymentMethod';

export const emptyOrder = {
  orderAmount: 0,
  paymentAmount: 0,
  orderDate: new Date(),
  customerId: 1,
  asap: true,
  deliveryDate: new Date(),
  deliveryLocation: {
    street: '',
    number: 0,
    city: { name: '', id: '', latitud: 0, longitud: 0 },
    reference: ''
  },
  pickupLocation: {
    street: '',
    number: 0,
    city: { name: '', id: '', latitud: 0, longitud: 0 },
    reference: ''
  },
  orderDetails: '',
  paymentMethod: {
    id: '',
    name: '',
    paymentType: '',
    card: {
      cardNumber: '',
      cardHolderName: '',
      expirationMonth: '',
      cvc: '',
      expirationYear: ''
    }
  }
};
