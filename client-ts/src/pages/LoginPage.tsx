import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/types/schemas";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services";

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
    // Integrar API / React Query luego
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Documento de Identidad"
            className="input input-bordered w-full"
            {...register("documentId")}
          />
          {errors.documentId && (
            <p className="text-red-500 text-sm text-right mr-1">{errors.documentId.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm text-right mr-1">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Login
        </button>
      </form>
      <p className="text-sm mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};
