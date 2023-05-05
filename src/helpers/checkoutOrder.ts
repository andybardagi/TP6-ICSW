import { Order } from '@/models/Order';

export default async function checkoutOrder(order: Order) {
  const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
    method: 'POST',
    body: JSON.stringify(order)
  });
  const resultData = await result.json();
  return resultData;
}
