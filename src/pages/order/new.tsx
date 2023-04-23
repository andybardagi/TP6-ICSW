import InputField from "@/components/forms/InputField";
import Card from "@/components/layout/Card";
import {City} from "@/models/City";
import {Order} from "@/models/Order";
import React, {useState} from "react";
import SelectField from "@/components/forms/SelectField";
import {PaymentMethod, PaymentType} from "@/models/PaymentMethod";
import {TextField} from "@/components/forms/TextField";
import {GetServerSideProps} from "next";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

type NewOrderPageProps = {
  cities: City[];
  paymentMethods: PaymentMethod[];
};

export default function NewOrderPage({cities, paymentMethods}: NewOrderPageProps) {
  const [order, setOrder] = useState<Order>({
    orderAmount: 0,
    paymentAmount: 0,
    orderDate: new Date(),
    customerId: 1,
    asap: true,
    deliveryDate: new Date(),
    deliveryLocation: {
      street: "",
      number: 0,
      city: {name: "", id: ""},
      reference: "",
    },
    pickupLocation: {
      street: "",
      number: 0,
      city: {name: "", id: ""},
      reference: "",
    },
    orderDetails: "",
    paymentMethod: {
      name: "",
      id: "",
      paymentType: PaymentType.Cash,
      card: {cardNumber: "", cardHolderName: "", expirationMonth: "", cvc: "", expirationYear: ""}
    },
  });

  const [focused, setFocused] = useState<"name" | "number" | "expiry" | "cvc" | undefined>(undefined);

  const handleLocationChange = (
    value: string,
    config: "deliveryLocation" | "pickupLocation",
    attr: "street" | "number" | "reference"
  ) => {
    setOrder((o) => ({
      ...o,
      [config]: {...o[config], [attr]: value},
    }));
  };

  const handleCityChange = (value: string, config: "deliveryLocation" | "pickupLocation") => {
    const city = cities.find((c) => c.id === value);
    setOrder((o) => ({
      ...o,
      [config]: {...o[config], city: city ?? {name: '', id: ''}},
    }));
  }

  const handlePaymentMethodChange = (value: string) => {
    const paymentMethod = paymentMethods.find((c) => c.id === value);
    setOrder((o) => ({
      ...o,
      paymentMethod: paymentMethod ?? {name: '', id: '', paymentType: PaymentType.Cash}
    }));
  }

  const handleCreditCardInfoChange = (
    value: string | number,
    atr: "cardHolderName" | "cardNumber" | "expirationMonth" | "expirationYear" | "cvc"
  ) => {
    setOrder((prevOrder) => {
      if (!prevOrder.paymentMethod.card) return prevOrder
      if (!(atr in prevOrder.paymentMethod.card)) return prevOrder
      return {
        ...prevOrder,
        paymentMethod: {
          ...prevOrder.paymentMethod,
          card: {
            ...prevOrder.paymentMethod.card,
            [atr]: value,
          },
        },
      }
    })
  }
  const getCityKey = (city: City) => city.id;
  const getCityName = (city: City) => city.name;

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-2xl font-bold mt-2 mb-0">Nuevo pedido</h1>
      <Card title="Productos">
        <InputField
          onChange={(v) => setOrder((o) => ({...o, orderDetails: v}))}
          label="¿Qué debe buscar el cadete?"
          placeholder="Cuéntanos que debe buscar el cadete"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="file" className="bg-cyan-600 px-4 py-2 text-white rounded-lg hover:bg-cyan-500 w-fit">
            Foto
          </label>
          <input id="file" type="file" className="max-w-lg hidden"/>
        </div>
      </Card>

      <Card title="Direccion de comercio">
        <InputField
          onChange={(value) =>
            handleLocationChange(value, "pickupLocation", "street")
          }
          label="Calle del comercio"
          placeholder="Indique la calle del local de su pedido"
        />
        <InputField
          onChange={(value) =>
            handleLocationChange(value, "pickupLocation", "number")
          }
          label="Número del comercio"
          placeholder="Indique el número de la calle de su comercio"
        />
        <InputField
          onChange={(value) =>
            handleLocationChange(value, "pickupLocation", "reference")
          }
          label="Referencia"
          placeholder="Ayuda al repartidor a encontrar el comercio"
        />
        <SelectField
          onChange={(value) => {
            handleCityChange(value, "pickupLocation")
            handleCityChange(value, "deliveryLocation")
          }}
          data={cities}
          keyExtractor={getCityKey}
          render={getCityName}
          label="Ciudad"
          placeholder="Seleccione la ciudad del comercio"
        />
      </Card>

      <Card title="Direccion de entrega">
        <InputField
          onChange={(value) =>
            handleLocationChange(value, "deliveryLocation", "street")
          }
          label="Calle del entrega"
          placeholder="Indique la calle donde debe ser entregado el pedido"
        />
        <InputField
          onChange={(value) =>
            handleLocationChange(value, "deliveryLocation", "number")
          }
          label="Número de la calle"
          placeholder="Indique el número de la calle donde debe ser entregado el pedido"
        />
        <InputField
          onChange={(value) =>
            handleLocationChange(value, "pickupLocation", "reference")
          }
          label="Referencia"
          placeholder="Ayuda al repartidor a encontrar tu domicilio"
        />
        <TextField
          text={order.deliveryLocation.city.name}
          label="Ciudad"
          placeholder="Seleccione la ciudad del comercio"
        />

      </Card>
      <Card title="Forma de pago">
        <SelectField
          onChange={(value) => handlePaymentMethodChange(value)}
          data={paymentMethods}
          keyExtractor={(pm: PaymentMethod) => pm.id}
          render={(pm: PaymentMethod) => pm.name}
          label="Forma de pago"
          placeholder="Seleccione la forma de pago"
        />

        <InputField
          onChange={(value) => setOrder((o) => ({...o, orderAmount: Number(value)}))}
          label="Monto del pedido"
          placeholder="Indique el monto del pedido"
        />

        <InputField
          onChange={(value) => setOrder((o) => ({...o, paymentAmount: Number(value)}))}
          label="Monto a pagar"
          placeholder="Indique el monto con el que va a pagar"
        />
      </Card>
      {(order.paymentMethod.paymentType === PaymentType.Card) && (
        <Card title={'Datos de la tarjeta'}>
          <div className="flex flex-row gap-1">
            <form onFocus={(e) => setFocused(e.target.name as "name" | "number" | "expiry" | "cvc" | undefined)}>
              <InputField
                onChange={(value) => handleCreditCardInfoChange(value, 'cardNumber')}
                label="Número de tarjeta"
                placeholder="Indique el número de la tarjeta"
                name='number'
                type='number'
              />
              <InputField
                onChange={(value) => handleCreditCardInfoChange(value, 'cardHolderName')}
                label="Nombre del titular"
                placeholder="Indique el nombre del titular de la tarjeta"
                name='name'
              />
              <div className="flex flex-row gap-1">
                <InputField
                  onChange={(value) => handleCreditCardInfoChange(value, 'expirationMonth')}
                  label='Mes de vencimiento'
                  placeholder='MM'
                  name='expiry'
                  maxLength={2}
                />
                <InputField
                  onChange={(value) => handleCreditCardInfoChange(value, 'expirationYear')}
                  label="Año de vencimiento"
                  placeholder="AA"
                  name='expiry'
                  maxLength={2}
                />
              </div>
              <InputField
                onChange={(value) => handleCreditCardInfoChange(value, 'cvc')}
                label='CVC'
                placeholder='Indique el CVV de la tarjeta'
                name='cvc'
                maxLength={3}
              />
            </form>
            {order.paymentMethod.card && (
              <div className="m-auto">
                <Cards
                  cvc={order.paymentMethod.card.cvc}
                  expiry={order.paymentMethod.card.expirationMonth + '/' + order.paymentMethod.card.expirationYear}
                  focused={focused}
                  name={order.paymentMethod.card.cardHolderName}
                  number={order.paymentMethod.card.cardNumber}
                  acceptedCards={['visa']}
                />
              </div>
            )}
          </div>
        </Card>
      )}
      <div className="flex flex-col gap-1 items-end">
        <label htmlFor="file" className="bg-cyan-600 px-4 py-2 text-white rounded-lg hover:bg-cyan-500 w-fit">
          <button onClick={() => console.log(order)}>Crear pedido</button>
        </label>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const citiesResData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cities`);
  const cities = await citiesResData.json();

  const paymentMethodsResData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payment/methods`);
  const paymentMethods = await paymentMethodsResData.json();

  return {
    props: {
      cities,
      paymentMethods,
    },
  };
};
