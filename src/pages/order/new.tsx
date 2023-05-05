import InputField from '@/components/forms/InputField';
import SelectField from '@/components/forms/SelectField';
import { TextField } from '@/components/forms/TextField';
import Card from '@/components/layout/Card';
import { calculateOrderAmount } from '@/helpers/calculateOrderAmount';
import { getErrorsMap } from '@/helpers/getErrorsMap';
import { City } from '@/models/City';
import { Order } from '@/models/Order';
import { PaymentMethod, PaymentType } from '@/models/PaymentMethod';
import { NewOrderValidationSchema } from '@/validation-schemas/NewOrderValidationSchema';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { ValidationError } from 'yup';
import checkoutOrder from '@/helpers/checkoutOrder';
import { emptyOrder } from '@/helpers/emptyOrder';
import { BsCheck, BsXCircleFill } from 'react-icons/bs';
import { VisaCreditCardValidationSchema } from '@/validation-schemas/VisaCreditCardValidationSchema';
import { validateNewOrder } from '@/helpers/validateNewOrder';

const MapView = dynamic(() => import('../../components/map/MapView'), {
  ssr: false
});

type NewOrderPageProps = {
  cities: City[];
  paymentMethods: PaymentMethod[];
};

export default function NewOrderPage({
  cities,
  paymentMethods
}: NewOrderPageProps) {
  const [order, setOrder] = useState<Order>(emptyOrder);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [focused, setFocused] = useState<
    'name' | 'number' | 'expiry' | 'cvc' | undefined
  >(undefined);

  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    // Verificar si el archivo es .png
    if (file && file.type === 'image/png') {
      //Validate that file does not exceed 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo no puede superar los 5MB');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(undefined);
      setPreviewUrl(undefined);
    }
  };

  const handleLocationChange = (
    value: string,
    config: 'deliveryLocation' | 'pickupLocation',
    attr: 'street' | 'number' | 'reference'
  ) => {
    setOrder((o) => ({
      ...o,
      [config]: { ...o[config], [attr]: value }
    }));

    if (config != 'pickupLocation') return;

    if (attr === 'street') {
      setInputValueStreet(value);
    } else if (attr === 'number') {
      setInputValueNumber(value);
    } else if (attr === 'reference') {
      setInputValueReference(value);
    }
  };

  const handleCityChange = (
    value: string,
    config: 'deliveryLocation' | 'pickupLocation'
  ) => {
    const city = cities.find((c) => c.id === value);
    setOrder((o) => ({
      ...o,
      [config]: {
        ...o[config],
        city: city ?? { name: '', id: '', latitud: 0, longitud: 0 }
      }
    }));
    if (value != '') {
      handleLocationChange('', 'pickupLocation', 'street');
      handleLocationChange('', 'pickupLocation', 'number');
      handleLocationChange('', 'pickupLocation', 'reference');
      //handleLocationChange('', 'deliveryLocation', 'street');
      //handleLocationChange('', 'deliveryLocation', 'number');
      //handleLocationChange('', 'deliveryLocation', 'reference');
    }
    setLatitud(city?.latitud || 0);
    setLongitud(city?.longitud || 0);
  };

  const handlePaymentMethodChange = (value: string) => {
    const paymentMethod = paymentMethods.find((c) => c.id === value);
    setOrder((o) => ({
      ...o,
      paymentMethod: paymentMethod ?? {
        name: '',
        id: '',
        paymentType: PaymentType.Cash
      }
    }));
  };

  const handleCreditCardInfoChange = (
    value: string | number,
    atr:
      | 'cardHolderName'
      | 'cardNumber'
      | 'expirationMonth'
      | 'expirationYear'
      | 'cvc'
  ) => {
    setOrder((prevOrder) => {
      if (!prevOrder.paymentMethod.card) return prevOrder;
      if (!(atr in prevOrder.paymentMethod.card)) return prevOrder;
      return {
        ...prevOrder,
        paymentMethod: {
          ...prevOrder.paymentMethod,
          card: {
            ...prevOrder.paymentMethod.card,
            [atr]: value
          }
        }
      };
    });
  };

  const handleMapClick = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    const { address } = data;
    setAddress({ latitud: lat, longitud: lng });
    const city = cities.find((c) => c.name === address?.city);
    if (city?.name === 'Córdoba') {
      handleCityChange(city?.id || '', 'pickupLocation');
      handleCityChange(city?.id || '', 'deliveryLocation');
      handleLocationChange(address?.road || '', 'pickupLocation', 'street');
      handleLocationChange(
        address?.house_number || '',
        'pickupLocation',
        'number'
      );
    } else {
      handleLocationChange('', 'pickupLocation', 'street');
      handleLocationChange('', 'pickupLocation', 'number');
      //handleLocationChange('', 'pickupLocation', 'reference');
    }
    setLatitud(lat);
    setLongitud(lng);
  };

  const [address, setAddress] = useState<Address>({
    latitud: -31.416668,
    longitud: -64.183334
  });

  const [inputValueStreet, setInputValueStreet] = useState('');
  const [inputValueNumber, setInputValueNumber] = useState('');
  const [inputValueReference, setInputValueReference] = useState('');

  const [latitud, setLatitud] = useState(-31.416668);
  const [longitud, setLongitud] = useState(-64.183334);

  const handleCheckout = async () => {
    try {
      const validationResult = await validateNewOrder(order);
      if (!validationResult.valid) {
        setErrors(validationResult.errors);
        return;
      }
      const result = await checkoutOrder(order);
      if (result.result === 'OK') {
        setOrder(emptyOrder);
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-2xl font-bold mt-2 mb-0">Nuevo pedido</h1>
      <Card title="Productos">
        <InputField
          onChange={(v) => {
            setOrder((o) => ({ ...o, orderDetails: v }));
            setOrder((o) => ({ ...o, orderAmount: calculateOrderAmount() }));
          }}
          label="¿Qué debe buscar el cadete?"
          placeholder="Cuéntanos que debe buscar el cadete"
          hasError={errors.orderDetails !== undefined}
          errorMessage={errors.orderDetails || ''}
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="file"
            className="bg-myYellow px-4 py-2 text-mainBlue rounded-lg hover:bg-myOrange w-fit"
          >
            Foto
          </label>
          <input
            id="file"
            type="file"
            className="max-w-lg hidden"
            onChange={handleFileInputChange}
          />
          <div>
            {previewUrl != null ? (
              <div className="relative w-fit">
                <BsXCircleFill
                  className="text-myRed text-2xl cursor-pointer absolute top-0 right-0"
                  title="Eliminar foto"
                  onClick={() => {
                    setSelectedFile(undefined);
                    setPreviewUrl(undefined);
                  }}
                />
                <img
                  src={previewUrl}
                  alt="Imagen previa"
                  className="border border-myYellow max-h-64"
                />
              </div>
            ) : null}
          </div>
        </div>
      </Card>

      <Card title="Momento de entrega">
        <form>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-row gap-4 items-center">
              <input
                type="radio"
                name="deliver-time"
                id="now"
                onChange={() => {
                  setOrder((o) => ({ ...o, asap: true }));
                }}
              />
              <label htmlFor="now">Lo antes posible</label>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <input
                type="radio"
                name="deliver-time"
                id="later"
                onChange={() => {
                  setOrder((o) => ({ ...o, asap: false }));
                }}
              />
              <label htmlFor="later">Programar entrega</label>
            </div>
            {order.asap ? null : (
              <div className="flex flex-col gap-2">
                <label htmlFor="later">Hora de entrega:</label>
                <input
                  type="datetime-local"
                  className={`border w-60 px-2 py-1 rounded-md ${
                    errors['deliveryDate'] !== undefined
                      ? 'border-myRed'
                      : 'border-myYellow'
                  }`}
                  onChange={(e) => {
                    setOrder((o) => ({
                      ...o,
                      deliveryDate: !e.target.value
                        ? undefined
                        : new Date(e.target.value)
                    }));
                  }}
                />
                {errors['deliveryDate'] !== undefined ? (
                  <p className="text-myRed">{errors['deliveryDate']}</p>
                ) : null}
              </div>
            )}
          </div>
        </form>
      </Card>

      <Card title="Direccion de comercio">
        <div className="lg:flex-row lg:gap-2 flex flex-col gap-3">
          <div className="flex flex-col gap-3 w-full">
            <SelectField
              onChange={(value) => {
                handleCityChange(value, 'pickupLocation');
                handleCityChange(value, 'deliveryLocation');
              }}
              data={cities}
              keyExtractor={(city) => city.id}
              render={(city) => city.name}
              label="Ciudad"
              placeholder="Seleccione la ciudad del comercio"
              value={order.pickupLocation.city.id}
              hasError={errors['pickupLocation.city.id'] !== undefined}
              errorMessage={errors['pickupLocation.city.id'] || ''}
            />

            <InputField
              onChange={(value) =>
                handleLocationChange(value, 'pickupLocation', 'street')
              }
              label="Calle del comercio"
              placeholder="Indique la calle del local de su pedido"
              value={inputValueStreet}
              hasError={errors['pickupLocation.street'] !== undefined}
              errorMessage={errors['pickupLocation.street'] || ''}
            />
            <InputField
              onChange={(value) =>
                handleLocationChange(value, 'pickupLocation', 'number')
              }
              label="Número del comercio"
              placeholder="Indique el número de la calle de su comercio"
              type="number"
              value={inputValueNumber}
              hasError={errors['pickupLocation.number'] !== undefined}
              errorMessage={errors['pickupLocation.number'] || ''}
            />
            <InputField
              onChange={(value) =>
                handleLocationChange(value, 'pickupLocation', 'reference')
              }
              label="Referencia"
              isOptional
              placeholder="Ayuda al repartidor a encontrar el comercio"
              value={inputValueReference}
              hasError={errors['pickupLocation.reference'] !== undefined}
              errorMessage={errors['pickupLocation.reference'] || ''}
            />
          </div>

          <div className="w-full">
            <MapView
              onChange={(lat, lng) => handleMapClick(lat, lng)}
              latitud={latitud}
              longitud={longitud}
              address={address}
            />
          </div>
        </div>
      </Card>

      <Card title="Direccion de entrega">
        <TextField
          text={order.deliveryLocation.city.name}
          label="Ciudad"
          placeholder="Seleccione la ciudad del comercio"
          hasError={errors['deliveryLocation.city.id'] !== undefined}
          errorMessage={errors['deliveryLocation.city.id'] || ''}
        />
        <InputField
          onChange={(value) =>
            handleLocationChange(value, 'deliveryLocation', 'street')
          }
          value={order.deliveryLocation.street}
          label="Calle del entrega"
          placeholder="Indique la calle donde debe ser entregado el pedido"
          hasError={errors['deliveryLocation.street'] !== undefined}
          errorMessage={errors['deliveryLocation.street'] || ''}
        />
        <InputField
          onChange={(value) =>
            handleLocationChange(value, 'deliveryLocation', 'number')
          }
          value={order.deliveryLocation.number.toString()}
          label="Número de la calle"
          placeholder="Indique el número de la calle donde debe ser entregado el pedido"
          type="number"
          hasError={errors['deliveryLocation.number'] !== undefined}
          errorMessage={errors['deliveryLocation.number'] || ''}
        />
        <InputField
          onChange={(value) =>
            handleLocationChange(value, 'deliveryLocation', 'reference')
          }
          label="Referencia"
          isOptional
          placeholder="Ayuda al repartidor a encontrar tu domicilio"
          hasError={errors['deliveryLocation.reference'] !== undefined}
          errorMessage={errors['deliveryLocation.reference'] || ''}
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
          hasError={errors['paymentMethod.id'] !== undefined}
          errorMessage={errors['paymentMethod.id'] || ''}
        />

        <InputField
          label="Monto del envio "
          placeholder="Indique el monto del envio"
          value={`$ ${order.orderAmount.toString()}`}
          onChange={() => {}}
        />

        {order.paymentMethod.paymentType === PaymentType.Cash && (
          <InputField
            onChange={(value) =>
              setOrder((o) => ({ ...o, paymentAmount: Number(value) }))
            }
            label="Monto a pagar"
            placeholder="Indique el monto con el que va a pagar"
            hasError={errors['paymentAmount'] !== undefined}
            errorMessage={errors['paymentAmount'] || ''}
          />
        )}
      </Card>

      {order.paymentMethod.paymentType === PaymentType.Card && (
        <Card title={'Datos de la tarjeta'}>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-1">
            <form
              className="flex flex-col gap-3"
              onFocus={(e) =>
                setFocused(
                  e.target.name as
                    | 'name'
                    | 'number'
                    | 'expiry'
                    | 'cvc'
                    | undefined
                )
              }
            >
              <InputField
                onChange={(value) =>
                  handleCreditCardInfoChange(value, 'cardNumber')
                }
                label="Número de tarjeta"
                placeholder="Indique el número de la tarjeta"
                name="number"
                maxLength={16}
                hasError={errors['paymentMethod.card.cardNumber'] !== undefined}
                errorMessage={errors['paymentMethod.card.cardNumber'] || ''}
              />
              <InputField
                onChange={(value) =>
                  handleCreditCardInfoChange(value, 'cardHolderName')
                }
                label="Nombre del titular"
                placeholder="Indique el nombre del titular de la tarjeta"
                name="name"
                hasError={
                  errors['paymentMethod.card.cardHolderName'] !== undefined
                }
                errorMessage={errors['paymentMethod.card.cardHolderName'] || ''}
              />
              <div className="flex flex-row gap-1 max-w-lg">
                <div className="w-full">
                  <InputField
                    onChange={(value) =>
                      handleCreditCardInfoChange(value, 'expirationMonth')
                    }
                    label="Mes de vencimiento"
                    placeholder="MM"
                    name="expiry"
                    maxLength={2}
                    hasError={
                      errors['paymentMethod.card.expirationMonth'] !== undefined
                    }
                    errorMessage={
                      errors['paymentMethod.card.expirationMonth'] || ''
                    }
                  />
                </div>
                <div className="w-full">
                  <InputField
                    onChange={(value) =>
                      handleCreditCardInfoChange(value, 'expirationYear')
                    }
                    label="Año de vencimiento"
                    placeholder="AAAA"
                    name="expiry"
                    maxLength={4}
                    hasError={
                      errors['paymentMethod.card.expirationYear'] !== undefined
                    }
                    errorMessage={
                      errors['paymentMethod.card.expirationYear'] || ''
                    }
                  />
                </div>
              </div>
              <InputField
                onChange={(value) => handleCreditCardInfoChange(value, 'cvc')}
                label="CVC"
                placeholder="Indique el CVV de la tarjeta"
                name="cvc"
                maxLength={3}
                hasError={errors['paymentMethod.card.cvc'] !== undefined}
                errorMessage={errors['paymentMethod.card.cvc'] || ''}
              />
            </form>
            {order.paymentMethod.card && (
              <div className="m-auto">
                <Cards
                  cvc={order.paymentMethod.card.cvc}
                  expiry={
                    order.paymentMethod.card.expirationMonth +
                    '/' +
                    order.paymentMethod.card.expirationYear
                  }
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
        <label className="bg-myYellow px-4 py-2 text-mainBlue rounded-lg hover:bg-myOrange w-full">
          <button
            onClick={handleCheckout}
            className="w-full font-semibold text-lg py-1 flex flex-row gap-2 items-center justify-center"
          >
            <BsCheck className="text-3xl" />
            Crear pedido
          </button>
        </label>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const citiesResData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/cities`
  );
  const cities = await citiesResData.json();

  const paymentMethodsResData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/payment/methods`
  );
  const paymentMethods = await paymentMethodsResData.json();

  return {
    props: {
      cities,
      paymentMethods
    }
  };
};
