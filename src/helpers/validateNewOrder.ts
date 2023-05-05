import { Order } from '@/models/Order';
import { PaymentType } from '@/models/PaymentMethod';
import { NewOrderValidationSchema } from '@/validation-schemas/NewOrderValidationSchema';
import { VisaCreditCardValidationSchema } from '@/validation-schemas/VisaCreditCardValidationSchema';
import { ValidationError } from 'yup';
import checkoutOrder from './checkoutOrder';
import { emptyOrder } from './emptyOrder';
import { getErrorsMap } from './getErrorsMap';

type OrderValidation = {
  valid: boolean;
  errors: Record<string, string>;
};

export const validateNewOrder = async (
  order: Order
): Promise<OrderValidation> => {
  let newErrors: Record<string, string> = {};
  let hasErrors = false;

  await NewOrderValidationSchema.validate(order, {
    abortEarly: false
  })
    .then(async () => {})
    .catch((err: unknown) => {
      if (err instanceof ValidationError) {
        newErrors = { ...newErrors, ...getErrorsMap(err) };
        hasErrors = true;
      } else {
        console.error(err);
      }
    });
  if (order.paymentMethod.paymentType === PaymentType.Card) {
    await VisaCreditCardValidationSchema.validate(order.paymentMethod.card, {
      abortEarly: false
    })
      .then(() => {})
      .catch((err: unknown) => {
        if (err instanceof ValidationError) {
          const creditCartErrors = getErrorsMap(err);
          const creditCartErrorsAdjust: Record<string, string> = {};
          Object.entries(creditCartErrors).forEach(([key, value]) => {
            creditCartErrorsAdjust[`paymentMethod.card.${key}`] = value;
          });
          newErrors = { ...newErrors, ...creditCartErrorsAdjust };
          hasErrors = true;
        } else {
          console.error(err);
        }
      });
  }
  return { valid: !hasErrors, errors: newErrors };
};
