import { OrderStatus } from '@/models/OrderStatus';
import { Location } from '@/models/Location';
import { PaymentMethod } from '@/models/PaymentMethod';

export class Order {
  constructor(
        public readonly orderAmount: number,
        public readonly paymentAmount: number,
        public readonly orderDate: Date,
        public readonly customerId: number,
        public readonly asap: boolean,
        public readonly deliveryLocation: Location,
        public readonly pickupLocation: Location,
        public readonly orderDetails: string,
        public readonly paymentMethod: PaymentMethod,
        public readonly deliveryDate?: Date,
        public readonly bikerId?: number,
        public readonly status?: OrderStatus,
        public readonly id?: number
  ) {}
}
