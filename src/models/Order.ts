import {OrderStatus} from "@/models/OrderStatus";

export class Order {
    constructor(
        public readonly orderAmount: number,
        public readonly paymentAmount: number,
        public readonly orderDate: Date,
        public readonly customerId: number,
        public readonly asap: boolean,
        public readonly deliveryDate: string,
        public readonly deliveryLocation: string,
        public readonly orderDetails: string,
        public readonly bikerId?: number,
        public readonly status?: OrderStatus,
        public readonly id?: number
    ) {}
}
