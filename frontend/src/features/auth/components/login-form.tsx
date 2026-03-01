"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import GoogleIcon from "../../../../public/google.svg";
import GithubIcon from "../../../../public/github.svg";
import { loginSchema, LoginValues } from "../schema";
import Link from "next/link";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Login:", values);
    setIsLoading(false);
  };

  return (
    <div className=" bg-white dark:bg-[#141625] ">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#4a5180] mt-1.5">
            Sign in to your account to continue
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-[#2d3154] bg-white dark:bg-[#1a1c2e] p-8 shadow-xl shadow-black/5 dark:shadow-black/40">
          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 h-11 rounded-xl border border-gray-200 dark:border-[#2d3154] bg-transparent text-sm font-medium text-gray-700 dark:text-[#a8b2d8] hover:bg-gray-50 dark:hover:bg-[#1e2035] hover:border-gray-300 dark:hover:border-[#4a5180] transition-all duration-200"
            >
              <Image height={20} width={20} alt="Google" src={GoogleIcon} />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 h-11 rounded-xl border border-gray-200 dark:border-[#2d3154] bg-transparent text-sm font-medium text-gray-700 dark:text-[#a8b2d8] hover:bg-gray-50 dark:hover:bg-[#1e2035] hover:border-gray-300 dark:hover:border-[#4a5180] transition-all duration-200"
            >
              <Image height={30} width={30} alt="Github" src={GithubIcon} />
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-100 dark:bg-[#2d3154]" />
            <span className="text-xs text-gray-400 dark:text-[#4a5180] uppercase tracking-widest">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-gray-100 dark:bg-[#2d3154]" />
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-[#a8b2d8]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        autoComplete="email"
                        className="bg-gray-50 dark:bg-[#1e2035] border-gray-200 dark:border-[#2d3154] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#4a5180] focus-visible:ring-0 focus-visible:border-indigo-400 dark:focus-visible:border-[#7b8cde] rounded-xl h-11 transition-colors duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500 dark:text-rose-400 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-[#a8b2d8]">
                        Password
                      </FormLabel>
                      <button
                        type="button"
                        className="text-xs text-indigo-500 dark:text-[#7b8cde] hover:text-indigo-700 dark:hover:text-[#a8b2d8] transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          className="bg-gray-50 dark:bg-[#1e2035] border-gray-200 dark:border-[#2d3154] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#4a5180] focus-visible:ring-0 focus-visible:border-indigo-400 dark:focus-visible:border-[#7b8cde] rounded-xl h-11 pr-11 transition-colors duration-200"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#4a5180] hover:text-gray-600 dark:hover:text-[#a8b2d8] transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-rose-500 dark:text-rose-400 text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-indigo-500 dark:bg-[#7b8cde] hover:bg-indigo-600 dark:hover:bg-[#6a7bcc] text-white font-semibold tracking-wide transition-all duration-200 group mt-1"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-[#4a5180] mt-5">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-indigo-500 dark:text-[#7b8cde] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
