import { Order } from '@/models/Order';

export default async function checkoutOrder(order: Order) {
  const checkoutResult = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/orders`,
    { method: 'POST', body: JSON.stringify(order) }
  );
  return checkoutResult.json();
}
