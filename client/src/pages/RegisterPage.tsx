import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/types/schemas";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { registerService } from "@/services";
import { CustomButton, CustomInput } from "@/components/ui";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      alert("User registered successfully");
      reset();
      navigate("/login");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center Upppercase">Crear Cuenta</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          {...register("fullName")}
          type="fullName"
          label="Nombre Completo"
          placeholder="Nombre Completo"
          error={errors.fullName?.message}
        />

        <CustomInput
          {...register("email")}
          type="email"
          label="Email"
          placeholder="Email"
          error={errors.email?.message}
        />

        <CustomInput
          {...register("documentId")}
          type="text"
          label="Documento de Identidad"
          placeholder="Documento de Identidad"
          error={errors.documentId?.message}
        />

        <CustomInput
          {...register("password")}
          type="password"
          label="Contraseña"
          placeholder="Contraseña"
          error={errors.password?.message}
        />

        <CustomInput
          {...register("confirmPassword")}
          type="password"
          label="Confirmar Contraseña"
          placeholder="Confirmar Contraseña"
          error={errors.confirmPassword?.message}
        />

        <div className="my-2">
          <div>
            <input
              {...register("terms")}
              type="checkbox"
              className="checkbox checkbox-sm"
            />
            <span className="ml-2 text-sm ">Acepto los Terminos y Condiciones</span>
          </div>
          <div>
            <input
              {...register("conditions")}
              type="checkbox"
              className="checkbox checkbox-sm"
            />
            <span className="ml-2 text-sm">Acepto la Política de Privacidad</span>
          </div>
          {errors.terms && (
            <p className="text-[var(--color-error)] text-xs"> -{errors.terms.message}</p>
          )}
          {errors.conditions && (
            <p className="text-[var(--color-error)] text-xs"> -{errors.conditions.message}</p>
          )}
        </div>

        <CustomButton type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Cargando..." : "Confirmar Registro"}
        </CustomButton>
      </form>
      <p className="text-sm mt-4 text-center">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-accent-600 hover:underline">
          Ingresa ahora
        </Link>
      </p>
    </div>
  );
};
