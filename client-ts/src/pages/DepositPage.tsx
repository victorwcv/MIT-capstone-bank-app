import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, type TransactionFormData } from "@/types/schemas";
import { CustomButton, CustomInput } from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { transactionService } from "@/services";
import { useEffect, useState } from "react";
import { getUserAccounts } from "@/services/accountService";
import { useAuthStore } from "@/stores";
import type { Account } from "@/types/accountResponse";

const DEFAULT_AMOUNTS = ["50", "100", "200", "500", "1000", "2000"];

export const DepositPage = () => {
  const user = useAuthStore((state) => state.user?.id);
  const [userAccounts, setUserAccounts] = useState<Account[]>([]);

  useEffect(() => {
    if (!user) return;
    getUserAccounts(user).then((accounts) => {
      console.log(accounts.data);
      setUserAccounts(accounts.data);
    });
  }, [user]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "deposit",
      amount: "0",
      currency: "USD",
      description: "",
      destinationAccountId: "",
    },
  });

  const mutation = useMutation({
    mutationFn: transactionService,
    onSuccess: (response) => {
      console.log(response);
      setUserAccounts((prevAccounts) => {
        return prevAccounts.map((account) => {
          if (account._id === response.data.accountUpdated._id) {
            return response.data.accountUpdated;
          }
          return account;
        });
      });
      reset();
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "message" in error) {
        alert((error as { message: string }).message);
      } else {
        alert("Ocurrió un error desconocido");
      }
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md m-2 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Realizar Depósito</h2>
      </div>
      <div className="">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {/* Seleccion de Cuenta */}
          <div className="bg-white p-6 rounded-lg shadow-md m-2">
            <h3 className="text-xl font-bold mb-4">Cuenta a Depositar</h3>
            <div className="flex flex-col text-left">
              {userAccounts.map((account) => (
                <label
                  key={account._id}
                  className={`m-1 py-2 px-6 rounded-lg cursor-pointer  transition-colors duration-300 ${
                    watch("destinationAccountId") === account._id
                      ? "text-white bg-accent-500"
                      : "bg-zinc-100 hover:bg-zinc-200"
                  }`}
                >
                  <input
                    type="radio"
                    value={account._id}
                    {...register("destinationAccountId")}
                    className="sr-only"
                  />
                  <p className="font-semibold">{account.alias || account.accountName}</p>
                  <p className="flex justify-between flex-wrap">
                    <span>{account.accountNumber}</span>
                    <span className="font-semibold">$ {account.balance}</span>
                  </p>
                </label>
              ))}
              {errors.destinationAccountId && (
                <span className="text-red-500 text-sm">{errors.destinationAccountId.message}</span>
              )}
            </div>
          </div>
          {/* Seleccion de Monto */}
          <div className="bg-white p-6 rounded-lg shadow-md m-2">
            <h3 className="text-xl font-bold mb-4">Monto a Depositar</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-center">
              {DEFAULT_AMOUNTS.map((amount) => (
                <label
                  key={amount}
                  className={`m-1 p-4 rounded-lg cursor-pointer transition-colors duration-300 ${
                    watch("amount") === amount
                      ? "text-white bg-accent-500"
                      : "bg-zinc-100 hover:bg-zinc-200"
                  }`}
                >
                  <input type="radio" value={amount} {...register("amount")} className="sr-only" />
                  <p className="font-semibold text-base md:text-xl">$ {amount}</p>
                </label>
              ))}
              {errors.amount && (
                <span className="text-red-500 text-sm">{errors.amount.message}</span>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div className="bg-white p-6 rounded-lg shadow-md m-2">
            <h3 className="text-xl font-bold mb-4">
              Descripcion <span className="text-gray-500 text-sm font-normal">{"(Opcional)"}</span>
            </h3>
            <CustomInput
              type="text"
              placeholder="Ej: Sueldo de Enero"
              error={errors.description?.message}
              {...register("description")}
              className="border-2"
            />
          </div>

          {/* Botones */}
          <div className="bg-white p-6 rounded-lg shadow-md m-2 flex justify-end">
            <CustomButton
              type="submit"
              disabled={!isValid || mutation.isPending}
              className="w-full md:w-sm py-6"
            >
              {mutation.isPending ? "Procesando..." : "Realizar Depósito"}
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
};
