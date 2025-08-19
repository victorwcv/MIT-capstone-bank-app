import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/types/schemas";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services";
import { CustomButton, CustomInput } from "@/components/ui";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const mutation = useMutation({
    mutationFn: loginService,
    onSuccess: (user) => {
      login(user);
      navigate("/", { replace: true });
    },
    onError: (error: unknown) => alert(error.message),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          type="text"
          variant="primary"
          placeholder="Documento de Identidad"
          label="Documento de Identidad"
          error={errors.documentId?.message}
          {...register("documentId")}
        />

        <CustomInput
          variant="primary"
          type="password"
          placeholder="Contraseña"
          label="Contraseña"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="my-4 flex items-center">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <span className="ml-2">
            Recordar mi cuenta
          </span>
        </div>

        <CustomButton type="submit" variant="primary" disabled={mutation.isPending}>
          {mutation.isPending ? "Cargando..." : "Ingresar"}
        </CustomButton>
      </form>
      <p className="text-sm mt-4 text-center">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-accent-600 hover:underline">
          Registrate ahora
        </Link>
      </p>
    </div>
  );
};
