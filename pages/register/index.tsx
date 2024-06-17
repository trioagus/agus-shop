import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRegisterStore } from "@/store/register-store";
import { User } from "@/types/user-type";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Head from "next/head";
import { useForm } from "react-hook-form";

export default function Register() {
  const router = useRouter();
  const { name, email, password, setName, setEmail, setPassword, reset } = useRegisterStore();
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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { user } = await response.json();
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        router.push("/login");
      } else {
        const { error } = await response.json();
        alert(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <main className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
          <h1 className="text-3xl text-center font-bold mb-8">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("name", { required: true })}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-2">Name is required</p>}
            </div>
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
              {errors.email && <p className="text-red-500 text-xs mt-2">Email is required</p>}
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
              {errors.password && <p className="text-red-500 text-xs mt-2">Password is required</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-blue-500 hover:underline">Login here</span>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
