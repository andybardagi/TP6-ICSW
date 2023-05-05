import { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '@/models/Order';
import { PaymentType } from '@/models/PaymentMethod';
import cardValidator from 'card-validator';
import { NewOrderValidationSchema } from '@/validation-schemas/NewOrderValidationSchema';
import { getErrorsMap } from '@/helpers/getErrorsMap';
import { validateNewOrder } from '@/helpers/validateNewOrder';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    const order: Order = JSON.parse(req.body);

    const validationResult = await validateNewOrder(order);


    if (!validationResult.valid) {
      return res.status(400).json({
        message: 'Error al crear el pedido',
        result: 'Error',
        errors: Object.values(validationResult.errors)
      });
    }

    return res.status(200).json({
      message: 'Pedido creado correctamente',
      result: 'OK'
    });
  }
}
