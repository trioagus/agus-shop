import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useLoginStore } from "@/store/login-store";
import { User } from "@/types/user-type";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Head from "next/head";
import { useForm } from "react-hook-form";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const { email, password, setEmail, setPassword, reset } = useLoginStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  useEffect(() => {
    reset();
  }, []);

  const onSubmit = async (data: User) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        setEmail(data.email);
        setPassword(data.password);
        router.push("/");
      } else {
        alert(response?.error || "Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <main className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
          <h1 className="text-3xl text-center font-bold mb-8">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-2">Please enter your email</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-2">Please enter your password</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register">
                <span className="text-blue-500 hover:underline">Register here</span>
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
