import { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '@/models/Order';
import { PaymentType } from '@/models/PaymentMethod';
import cardValidator from 'card-validator';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    const order: Order = JSON.parse(req.body);

    if (!order) {
      return res.status(400).json({
        message: 'No order provided'
      })
    }

    if (!order.paymentMethod) {
      return res.status(400).json({
        message: 'No payment method provided'
      })
    }

    if (order.paymentMethod.paymentType === PaymentType.Card) {
      if (!order.paymentMethod.card) {
        return res.status(400).json({
          message: 'No card provided'
        })
      }

      const cardValidation = cardValidator.number(order.paymentMethod.card.cardNumber);
      if (!cardValidation.isValid) {
        return res.status(400).json({
          message: 'Invalid card number'
        })
      }

      if (cardValidation.card && cardValidation.card.type !== 'visa') {
        return res.status(400).json({
          message: 'Only Visa cards are accepted'
        })
      }
    }


    return res.status(200).json({
      message: 'Order saved successfully'
    })
  }
}
