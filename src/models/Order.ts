import {OrderStatus} from "@/models/OrderStatus";

export class Order {
    constructor(
        public readonly id: number,
        public readonly orderAmount: number,
        public readonly paymentAmount: number,
        public readonly orderDate: Date,
        public readonly customerId: number,
        public readonly status: OrderStatus,
        public readonly bikerId: number,
        public readonly asap: boolean,
        public readonly deliveryDate: string,
        public readonly deliveryLocation: string,
    ) {}
}
