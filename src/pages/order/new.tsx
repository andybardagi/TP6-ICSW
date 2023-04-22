import InputField from "@/components/forms/InputField";
import Card from "@/components/layout/Card";
import { City } from "@/models/City";
import { Order } from "@/models/Order";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import SelectField from "@/components/forms/SelectField";

type NewOrderPageProps = {
  cities: City[];
};

export default function NewOrderPage({ cities }: NewOrderPageProps) {
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
      city: { name: "", id: "" },
      reference: "",
    },
    pickupLocation: {
      street: "",
      number: 0,
      city: { name: "", id: "" },
      reference: "",
    },
    orderDetails: "",
  });

  const handleLocationChange = (
      value: string | City,
      config: "deliveryLocation" | "pickupLocation",
      attr: "street" | "number" | "reference" | "city",
  ) => {
    setOrder((o) => ({
      ...o,
      [config]: {
        ...o[config],
        [attr]: value,
        city: {
          ...o[config].city,
            name: (value as City).name,
            id: (value as City).id,
        },
      },
    }));
  };

  const getCityKey = (city: City) => city.id;
  const getCityName = (city: City) => city.name;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mt-2 mb-0">Nuevo pedido</h1>
      <Card title="Productos">
        <InputField
          onChange={(v) => setOrder((o) => ({ ...o, orderDetails: v }))}
          label="¿Qué debe buscar el cadete?"
          placeholder="Cuéntanos que debe buscar el cadete"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="file" className="bg-cyan-600 px-4 py-2 text-white rounded-lg hover:bg-cyan-500 w-fit">
            Foto
          </label>
          <input id="file" type="file" className="max-w-lg hidden" />
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
              const city = cities.find((c) => c.id === value);
              handleLocationChange((city ?? ''), "pickupLocation", "city")
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
      </Card>
      <Card title="Forma de pago">
        {cities.map((c) => (
          <p key={c.id}>
            {c.name} - {c.id}
          </p>
        ))}
      </Card>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cities`);
  const cities = await resData.json();
  return {
    props: {
      cities,
    },
  };
};
