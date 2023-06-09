import { boolean, date, number, object, string } from 'yup';
export const NewOrderValidationSchema = object().shape({
  orderAmount: number()
    .min(0)
    .required('El costo del pedido es requerido')
    .typeError('El costo del pedido debe ser un número'),
  paymentAmount: number()
    .required('El monto a pagar es requerido')
    .when('orderAmount', ([orderAmount], schema) => {
      return schema.min(
        orderAmount,
        'El monto a pagar debe ser mayor o igual al costo del pedido'
      );
    })
    .typeError('El monto a pagar debe ser un número'),
  orderDate: date()
    .required('La fecha del pedido es requerida')
    .typeError('La fecha del pedido debe ser una fecha'),
  customerId: number()
    .min(0)
    .required('El cliente es requerido')
    .typeError('El id del cliente debe ser un número'),
  asap: boolean()
    .required('El pedido asap es requerido')
    .typeError('El pedido asap debe ser un booleano'),
  deliveryDate: date()
    .when('asap', ([asap], schema) => {
      const minDate = new Date();
      minDate.setTime(minDate.getTime() + 60 * 60 * 1000);
      const maxDate = new Date();
      maxDate.setTime(maxDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      if (!asap)
        return schema
          .required('La fecha de entrega es requerida')
          .min(
            minDate,
            'La fecha y hora programada debe ser posterior a la próxima hora'
          )
          .max(
            maxDate,
            'La fecha y hora programada no puede ser posterior a una semana'
          );
      return schema;
    })
    .typeError('La fecha de entrega debe ser una fecha'),
  deliveryLocation: object().shape({
    street: string()
      .required('La calle de la ubicación de entrega es requerida')
      .typeError('La calle de la ubicación de entrega debe ser un string'),
    number: number()
      .required('El número de la ubicación de entrega es requerido')
      .min(1, 'El número de la ubicación de entrega debe ser mayor a 0')
      .typeError('El número de la ubicación de entrega debe ser un número'),
    city: object().shape({
      id: string()
        .required('La ciudad de la ubicación de entrega es requerido')
        .typeError(
          'El id de la ciudad de la ubicación de entrega debe ser un string'
        ),
      name: string()
        .required(
          'El nombre de la ciudad de la ubicación de entrega es requerido'
        )
        .typeError(
          'El nombre de la ciudad de la ubicación de entrega debe ser un string'
        ),
      latitud: number()
        .required(
          'La latitud de la ciudad de la ubicación de entrega es requerida'
        )
        .typeError(
          'La latitud de la ciudad de la ubicación de entrega debe ser un número'
        ),
      longitud: number()
        .required(
          'La longitud de la ciudad de la ubicación de entrega es requerida'
        )
        .typeError(
          'La longitud de la ciudad de la ubicación de entrega debe ser un número'
        )
    }),
    reference: string()
      .typeError('La referencia de la ubicación de entrega debe ser un string')
  }),
  pickupLocation: object().shape({
    street: string()
      .required('La calle de la ubicación de recogida es requerida')
      .typeError('La calle de la ubicación de recogida debe ser un string'),
    number: number()
      .required('El número de la ubicación de recogida es requerido')
      .min(1, 'El número de la ubicación de recogida debe ser mayor a 0')
      .typeError('El número de la ubicación de recogida debe ser un número'),
    city: object().shape({
      id: string()
        .required('La ciudad de la ubicación de recogida es requerido')
        .typeError(
          'El id de la ciudad de la ubicación de recogida debe ser un string'
        ),
      name: string()
        .required(
          'El nombre de la ciudad de la ubicación de recogida es requerido'
        )
        .typeError(
          'El nombre de la ciudad de la ubicación de recogida debe ser un string'
        ),
      latitud: number()
        .required(
          'La latitud de la ciudad de la ubicación de recogida es requerida'
        )
        .typeError(
          'La latitud de la ciudad de la ubicación de recogida debe ser un número'
        ),
      longitud: number()
        .required(
          'La longitud de la ciudad de la ubicación de recogida es requerida'
        )
        .typeError(
          'La longitud de la ciudad de la ubicación de recogida debe ser un número'
        )
    }),
    reference: string()
      .typeError('La referencia de la ubicación de recogida debe ser un string')
  }),
  orderDetails: string()
    .required('Los detalles del pedido son requeridos')
    .typeError('Los detalles del pedido deben ser un string'),
  paymentMethod: object().shape({
    id: string()
      .required('El método de pago es requerido')
      .typeError('El id del método de pago debe ser un string'),
    name: string()
      .required('El nombre del método de pago es requerido')
      .typeError('El nombre del método de pago debe ser un string'),
    paymentType: string()
      .required('El tipo de pago del método de pago es requerido')
      .typeError('El tipo de pago del método de pago debe ser un string'),
    card: object().shape({
      cardNumber: string(),
      cardHolderName: string(),
      expirationMonth: string(),
      expirationYear: string(),
      cvc: string()
    })
  }),
  bikerId: number(),
  status: string(),
  id: number()
});
