import { NextApiRequest, NextApiResponse } from 'next';
import { PaymentMethod } from '@/models/PaymentMethod';
import { paymentMethodArray } from '@/support/payment-method-array';

export default function handler(req: NextApiRequest, res: NextApiResponse<PaymentMethod[]>) {
  if (req.method === 'GET') {
    return res.status(200).json(paymentMethodArray)
  }
}
