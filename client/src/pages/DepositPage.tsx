import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { depositSchema, type DepositFormData } from "@/types/schemas";
import { CustomBlock, CustomButton, CustomInput } from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { depositService } from "@/services";
import { useEffect, useState } from "react";
import { getUserAccounts } from "@/services/accountService";
import { useAuthStore } from "@/stores";
import type { Account } from "@/types/accountResponse";
import { toCents } from "@/utils/utils";
import { BanknoteArrowUp } from "lucide-react";

const DEFAULT_AMOUNTS = [20, 50, 100, 200, 500];

export const DepositPage = () => {
  const user = useAuthStore((state) => state.user?.id);
  const [userAccounts, setUserAccounts] = useState<Account[]>([]);

  useEffect(() => {
    if (!user) return;
    getUserAccounts(user).then((accounts) => {
      setUserAccounts(accounts.data);
    });
  }, [user]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    mode: "onChange",
    defaultValues: {
      type: "deposit",
      currency: "PEN",
      amount: NaN,
    },
  });

  const mutation = useMutation({
    mutationFn: depositService,
    onSuccess: (response) => {
      setUserAccounts((prev) =>
        prev.map((acc) =>
          acc._id === response.data.accountUpdated._id
            ? response.data.accountUpdated
            : acc
        )
      );
      reset();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Error desconocido";
      alert(message);
    },
  });

  const onSubmit = (data: DepositFormData) => {
    mutation.mutate({
      ...data,
      amount: toCents(data.amount),
    });
  };

  return (
    <>
      {/* Título */}
      <CustomBlock>
        <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold uppercase">
          <BanknoteArrowUp size={28} /> Realizar Depósito
        </h2>
      </CustomBlock>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Selección de Cuenta */}
        <CustomBlock>
          <h3 className="text-lg sm:text-xl font-bold mb-3">Cuenta a Depositar</h3>
          <Controller
            name="userAccountId"
            control={control}
            rules={{ required: "Debe seleccionar una cuenta" }}
            render={({ field }) => (
              <div className="flex flex-col text-left">
                {userAccounts.map((account) => (
                  <button
                    key={account._id}
                    type="button"
                    onClick={() => field.onChange(account._id)}
                    className={`text-white/90 m-1 p-3 text-left rounded transition-colors duration-150 ${
                      field.value === account._id
                        ? "bg-accent-500"
                        : "bg-zinc-400"
                    }`}
                  >
                    <p className="font-semibold text-sm sm:text-base">
                      {account.alias || account.accountName}
                    </p>
                    <p className="flex justify-between text-xs sm:text-sm mt-1">
                      <span>{account.accountNumber}</span>
                      <span className="font-semibold">
                        {account.currency} {(account.balance / 100).toFixed(2)}
                      </span>
                    </p>
                  </button>
                ))}
              </div>
            )}
          />
          {errors.userAccountId && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.userAccountId.message}
            </span>
          )}
        </CustomBlock>

        {/* Selección de Monto */}
        <CustomBlock>
          <h3 className="text-lg sm:text-xl font-bold mb-3">Monto a Depositar</h3>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {DEFAULT_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => field.onChange(amount)}
                    className={`text-white/90 p-3 rounded font-semibold text-base transition-colors duration-150 ${
                      field.value === amount
                        ? "bg-accent-500"
                        : "bg-zinc-400"
                    }`}
                  >
                    {amount}
                  </button>
                ))}

                {/* Input personalizado */}
                <CustomInput
                  type="text"
                  placeholder="Otros"
                  value={field.value ? String(field.value) : ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(value ? parseInt(value, 10) : 0);
                  }}
                  className="text-lg text-center"
                />
              </div>
            )}
          />
          {errors.amount && (
            <span className="text-red-500 text-sm block mt-1">
              {errors.amount.message}
            </span>
          )}
        </CustomBlock>

        {/* Descripción */}
        <CustomBlock>
          <h3 className="text-lg sm:text-xl font-bold mb-3">
            Descripción{" "}
            <span className="text-gray-500 text-sm font-normal">(Opcional)</span>
          </h3>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <CustomInput
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Ej: Sueldo de Enero"
                value={field.value}
                onChange={field.onChange}
                error={errors.description?.message}
                className="border-2 text-base p-3"
              />
            )}
          />
        </CustomBlock>

        {/* Botón */}
        <CustomBlock >
          <CustomButton
            type="submit"
            disabled={!isValid || mutation.isPending}
            className="w-full py-4 text-lg sm:text-xl font-semibold"
          >
            {mutation.isPending ? "Procesando..." : "Depositar"}
          </CustomButton>
        </CustomBlock>
      </form>
    </>
  );
};