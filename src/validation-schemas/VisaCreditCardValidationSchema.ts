import cardValidator from 'card-validator';
import { number, object, string } from 'yup';

export const VisaCreditCardValidationSchema = object().shape({
  cardNumber: string()
    .required('El número de tarjeta de crédito es requerido')
    .test(
      'test-card-number',
      'La tarjeta de crédito no es válida',
      (cardNumber) => {
        const isValid = cardValidator.number(cardNumber).isValid;
        return isValid;
      }
    )
    .test(
      'test-card-visa',
      'La tarjeta de crédito no es VISA',
      (cardNumber) => {
        const cardValidation = cardValidator.number(cardNumber);
        const isInvalid =
          cardValidation.card && cardValidation.card.type !== 'visa';
        return !isInvalid;
      }
    ),
  cardHolderName: string().required('El nombre del titular es requerido'),
  expirationMonth: number()
    .required('El mes de expiración es requerido')
    .test(
      'test-card-expiration-month',
      'El mes de expiración de la tarjeta de crédito no es válido',
      (expirationMonth) => {
        const isValid =
          expirationMonth >= 1 &&
          expirationMonth <= 12 &&
          expirationMonth % 1 === 0;
      }
    ),
  expirationYear: number()
    .required('El año de expiración es requerido')
    .min(
      new Date().getFullYear(),
      'El año de expiración debe ser actual o posterior'
    )
    .when('expirationMonth', ([expirationMonth], schema) => {
      return schema.test(
        'test-card-expiration-date',
        'La fecha de expiración de la tarjeta de crédito no es válida',
        (expirationYear) => {
          const today = new Date();
          const cardExpiration = new Date();
          cardExpiration.setFullYear(expirationYear);
          cardExpiration.setMonth(expirationMonth);
          cardExpiration.setDate(0);
          return cardExpiration.getTime() >= today.getTime();
        }
      );
    })
    .typeError(
      'El año de expiración de la tarjeta de crédito debe ser un número entero'
    ),
  cvc: number()
    .required('El código de seguridad es requerido')
    .typeError('El código de seguridad debe ser un número entero')
    .test(
      'test-card-cvc',
      'El código de seguridad de la tarjeta de crédito no es válido',
      (cvc) => {
        const isValid = cvc.toString().length === 3;
        return isValid;
      }
    )
});
