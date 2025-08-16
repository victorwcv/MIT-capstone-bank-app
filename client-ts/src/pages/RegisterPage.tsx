import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/types/schemas";
import { Link } from "react-router";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    // Integrar API / React Query luego
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm text-right mr-1">{errors.email.message}</p>
          )}
        </div>
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
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm text-right mr-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Register
        </button>
      </form>
      <p className="text-sm mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};
