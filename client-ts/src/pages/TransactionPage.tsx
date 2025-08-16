import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, type TransactionFormData } from "@/types/schemas";

export const TransactionPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "DEPÓSITO",
      category: "Alimentos",
      account: "Cuenta Principal ****1234",
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    console.log("Transacción enviada:", data);
    // Aquí integrar React Query para enviar al backend
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md m-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Realizar Transacción</h2>
        <p>Tipo de Transacción: <span className="font-semibold">{watch("type")}</span></p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md m-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Tipo de transacción */}
          <label className="flex flex-col">
            Tipo de Transacción
            <select {...register("type")} className="input input-bordered w-full mt-1">
              <option value="DEPÓSITO">Depósito</option>
              <option value="RETIRO">Retiro</option>
            </select>
            {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
          </label>

          {/* Monto */}
          <label className="flex flex-col">
            Monto
            <input
              type="number"
              step="0.01"
              placeholder="$0.00"
              className="input input-bordered w-full mt-1"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message}</span>}
          </label>

          {/* Descripción */}
          <label className="flex flex-col">
            Descripción
            <input
              type="text"
              placeholder="Descripción"
              className="input input-bordered w-full mt-1"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </label>

          {/* Categoría */}
          <label className="flex flex-col">
            Categoría
            <select {...register("category")} className="input input-bordered w-full mt-1">
              <option>Alimentos</option>
              <option>Transporte</option>
              <option>Entretenimiento</option>
              <option>Salud</option>
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm">{errors.category.message}</span>
            )}
          </label>

          {/* Cuenta destino */}
          <label className="flex flex-col">
            Cuenta Destino
            <select {...register("account")} className="input input-bordered w-full mt-1">
              <option>Cuenta Principal ****1234</option>
              <option>Cuenta Ahorro ****5678</option>
            </select>
            {errors.account && (
              <span className="text-red-500 text-sm">{errors.account.message}</span>
            )}
          </label>

          {/* Botones */}
          <div className="flex justify-center mt-4">
            <button type="submit" className="btn primary">
              Confirmar Transacción
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
