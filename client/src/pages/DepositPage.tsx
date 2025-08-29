import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { depositSchema, type DepositFormData } from "@/types/schemas";
import { CustomButton, CustomInput } from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { depositService } from "@/services";
import { useEffect, useState } from "react";
import { getUserAccounts } from "@/services/accountService";
import { useAuthStore } from "@/stores";
import type { Account } from "@/types/accountResponse";
import { toCents, fromCents } from "@/utils/utils";
import { BanknoteArrowUp } from "lucide-react";

const DEFAULT_AMOUNTS = ["20", "50", "100", "200", "500"];

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
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      type: "deposit",
      amount: "",
      currency: "PEN",
      description: "",
      userAccountId: "",
    },
  });

  const mutation = useMutation({
    mutationFn: depositService,
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

  const onSubmit = (data: DepositFormData) => {
    const { amount, ...rest } = data;
    mutation.mutate({
      ...rest,
      amount: toCents(parseInt(amount as string)),
    });
  };

  return (
    <>
      <div className="bg-white p-6 rounded-sm shadow-md m-2 flex items-center gap-2">
        <BanknoteArrowUp size={30} />
        <h2 className="text-2xl font-bold uppercase"> Realizar Depósito</h2>
      </div>
      <div className="">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {/* Seleccion de Cuenta */}
          <div className="bg-white p-6 rounded-sm shadow-md m-2">
            <h3 className="text-xl font-bold mb-4">Cuenta a Depositar</h3>
            <div className="flex flex-col text-left">
              {userAccounts.map((account) => (
                <label
                  key={account._id}
                  className={`m-1 py-2 px-6 cursor-pointer rounded-sm transition-colors duration-300 ${
                    watch("userAccountId") === account._id
                      ? "text-white/90 bg-accent-500 hover:bg-accent-600"
                      : "bg-zinc-200 hover:bg-zinc-300"
                  }`}
                >
                  <input
                    type="radio"
                    value={account._id}
                    {...register("userAccountId")}
                    className="sr-only"
                  />
                  <p className="font-semibold">{account.alias || account.accountName}</p>
                  <p className="flex justify-between flex-wrap">
                    <span>{account.accountNumber}</span>
                    <span className="font-semibold">$ {fromCents(account.balance).toFixed(2)}</span>
                  </p>
                </label>
              ))}
              {errors.userAccountId && (
                <span className="text-red-500 text-sm">{errors.userAccountId.message}</span>
              )}
            </div>
          </div>
          {/* Seleccion de Monto */}
          <div className="bg-white p-6 rounded-sm shadow-md m-2">
            <h3 className="text-xl font-bold mb-4">Monto a Depositar</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-center">
              {DEFAULT_AMOUNTS.map((amount) => (
                <label
                  key={amount}
                  className={`p-4 cursor-pointer rounded-sm transition-colors duration-300 ${
                    watch("amount") === amount
                      ? "text-white/90 bg-accent-500 hover:bg-accent-600"
                      : "bg-zinc-200 hover:bg-zinc-300"
                  }`}
                >
                  <input type="radio" value={amount} {...register("amount")} className="sr-only" />
                  <p className="font-semibold text-base md:text-xl">$ {amount}</p>
                </label>
              ))}
              <CustomInput className="font-semibold text-base md:text-xl text-center" />
              {errors.amount && (
                <span className="text-red-500 text-sm">{errors.amount.message}</span>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div className="bg-white p-6 rounded-sm shadow-md m-2">
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
          <div className="bg-white p-6 rounded-sm shadow-md m-2 flex justify-center">
            <CustomButton
              type="submit"
              disabled={!isValid || mutation.isPending}
              className="w-full md:w-sm py-5 text-xl font-semibold"
            >
              {mutation.isPending ? "Procesando..." : "Depositar"}
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
};
