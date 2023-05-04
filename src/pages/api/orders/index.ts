import { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '@/models/Order';
import { PaymentType } from '@/models/PaymentMethod';
import cardValidator from 'card-validator';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    const order: Order = JSON.parse(req.body);

    if (!order) {
      return res.status(400).json({
        message: 'Debes enviar un pedido',
        result: 'ERROR'
      })
    }

    if (!order.paymentMethod) {
      return res.status(400).json({
        message: 'No proporcionaste un método de pago',
        result: 'ERROR'
      })
    }

    if (order.paymentMethod.paymentType === PaymentType.Card) {
      if (!order.paymentMethod.card) {
        return res.status(400).json({
          message: 'No proporcionaste una tarjeta de crédito',
          result: 'ERROR'
        })
      }

      const cardValidation = cardValidator.number(order.paymentMethod.card.cardNumber);
      if (!cardValidation.isValid) {
        return res.status(400).json({
          message: 'La tarjeta de crédito no es válida',
          result: 'ERROR'
        })
      }

      if (cardValidation.card && cardValidation.card.type !== 'visa') {
        return res.status(400).json({
          message: 'Solo se aceptan tarjetas Visa',
          result: 'ERROR'
        })
      }

      const expirationMonthValidation = cardValidator.expirationMonth(order.paymentMethod.card.expirationMonth);
      if (!expirationMonthValidation.isValid) {
        return res.status(400).json({
          message: 'El mes de expiración de la tarjeta de crédito no es válido',
          result: 'ERROR'
        })
      }

      const expirationYearValidation = cardValidator.expirationYear(order.paymentMethod.card.expirationYear);
      if (!expirationYearValidation.isValid) {
        return res.status(400).json({
          message: 'El año de expiración de la tarjeta de crédito no es válido',
          result: 'ERROR'
        })
      }
    }

    if (!order.orderAmount) {
      return res.status(400).json({
        message: 'No proporcionaste el monto del pedido',
        result: 'ERROR'
      })
    }

    return res.status(200).json({
      message: 'Pedido creado correctamente',
      result: 'OK'
    })
  }
}
