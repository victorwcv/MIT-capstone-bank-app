import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, type TransactionFormData } from "@/types/schemas";
import { CustomButton, CustomInput } from "@/components/ui";

const DEFAULT_AMOUNTS = ["50", "100", "200", "500", "1000", "2000"];

export const DepositPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "deposit",
      amount: "0",
      description: "",
      account: "",
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    console.log("Transacción enviada:", data);
    // Aquí integrar React Query para enviar al backend
  };

  const accounts = [
    {
      id: "1",
      name: "Cuenta Principal",
      accountNumber: "12345678",
      balance: "10000.00",
      Currency: "USD",
    },
    {
      id: "2",
      name: "Cuenta Ahorro",
      accountNumber: "87654321",
      balance: "5000.00",
      Currency: "USD",
    },
  ];

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md m-2 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Realizar Depósito</h2>
        <span className="text-gray-500">Paso 1 de 2</span>
      </div>
      <div className="">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {/* Seleccion de Cuenta */}
          <div className="bg-white p-6 rounded-lg shadow-md m-2">
            <h3 className="text-xl font-bold mb-4">Seleccionar Cuenta de Destino</h3>
            <div className="flex flex-col text-left">
              {accounts.map((account) => (
                <label
                  key={account.id}
                  className={`m-1 py-2 px-6 rounded-lg cursor-pointer  transition-colors duration-300 ${
                    watch("account") === account.id
                      ? "text-white bg-accent-500 hover:bg-accent-600"
                      : "bg-zinc-100 hover:bg-zinc-200"
                  }`}
                >
                  <input
                    type="radio"
                    value={account.id}
                    {...register("account")}
                    className="sr-only"
                  />
                  <p className="font-semibold">{account.name}</p>
                  <p className="flex justify-between">
                    <span>{account.accountNumber}</span> <span className="font-semibold">$ {account.balance}</span>
                  </p>
                </label>
              ))}
              {errors.account && (
                <span className="text-red-500 text-sm">{errors.account.message}</span>
              )}
            </div>
          </div>
          {/* Seleccion de Monto */}
          <div className="bg-white p-6 rounded-lg shadow-md m-2">
            <h3 className="text-xl font-bold mb-4">Seleccionar Cuenta de Destino</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              {DEFAULT_AMOUNTS.map((amount) => (
                <label
                  key={amount}
                  className={`m-1 p-6 rounded-lg cursor-pointer transition-colors duration-300 ${
                    watch("amount") === amount
                      ? "text-white bg-accent-500 hover:bg-accent-600"
                      : "bg-zinc-100 hover:bg-zinc-200"
                  }`}
                >
                  <input type="radio" value={amount} {...register("amount")} className="sr-only" />
                  <p className="font-semibold text-2xl">{amount}</p>
                </label>
              ))}
              {errors.amount && (
                <span className="text-red-500 text-sm">{errors.amount.message}</span>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div className="bg-white p-6 rounded-lg shadow-md m-2">
            <h3 className="text-xl font-bold mb-4">Descripcion de la Transacción</h3>
            <CustomInput
              type="text"
              placeholder="Ej: Sueldo de Enero"
              error={errors.description?.message}
              {...register("description")}
            />
          </div>

          {/* Botones */}
          <div className="flex justify-center mt-4">
            <CustomButton type="submit" variant="primary" disabled={!isValid} className="w-1/2 ">
              Continuar
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
};
