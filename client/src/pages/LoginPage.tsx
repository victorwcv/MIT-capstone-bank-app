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
    defaultValues: {
      documentId: "86753424",
      password: "password",
      rememberMe: false,
    },
  });

  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: loginService,
    onSuccess: (response) => {
      setUser(response.data.user);
      localStorage.setItem("access-token", response.data.accessToken);
      navigate("/", { replace: true });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Login error", error.message);
      } else {
        console.log("Login error", error);
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Ingresar</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          type="text"
          placeholder="Documento de Identidad"
          label="Documento de Identidad"
          error={errors.documentId?.message}
          {...register("documentId")}
        />

        <CustomInput
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
            className="checkbox checkbox-sm"
          />
          <span className="ml-2">
            Recordar mi cuenta
          </span>
        </div>

        <CustomButton type="submit"  disabled={mutation.isPending}>
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
