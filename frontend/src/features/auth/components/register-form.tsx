"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Eye, EyeOff, Sparkles } from "lucide-react";
import GoogleIcon from "../../../../public/google.svg";
import GithubIcon from "../../../../public/github.svg";
import Image from "next/image";
import { signupSchema, SignupValues } from "../schema";
import Link from "next/link";

function getStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  const levels = [
    { label: "", color: "bg-transparent" },
    { label: "Weak", color: "bg-rose-500" },
    { label: "Fair", color: "bg-amber-400" },
    { label: "Good", color: "bg-sky-400" },
    { label: "Strong", color: "bg-emerald-400" },
  ];
  return { score, ...levels[score] };
}

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const password = form.watch("password");
  const strength = getStrength(password);

  const onSubmit = async (values: SignupValues) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Signup:", values);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#4a5180] mt-1.5">
            Get started — it only takes a minute
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-[#a8b2d8]">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jane Doe"
                        autoComplete="name"
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
                    <FormLabel className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-[#a8b2d8]">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
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

                    {/* Password strength meter */}
                    {password.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                i <= strength.score
                                  ? strength.color
                                  : "bg-gray-100 dark:bg-[#2d3154]"
                              }`}
                            />
                          ))}
                        </div>
                        {strength.label && (
                          <p className="text-xs text-gray-500 dark:text-[#a8b2d8]">
                            Strength:{" "}
                            <span
                              className={
                                strength.score === 4
                                  ? "text-emerald-500"
                                  : strength.score === 3
                                    ? "text-sky-500"
                                    : strength.score === 2
                                      ? "text-amber-500"
                                      : "text-rose-500"
                              }
                            >
                              {strength.label}
                            </span>
                          </p>
                        )}
                      </div>
                    )}

                    <FormMessage className="text-rose-500 dark:text-rose-400 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-[#a8b2d8]">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showConfirm ? "text" : "password"}
                          autoComplete="new-password"
                          className="bg-gray-50 dark:bg-[#1e2035] border-gray-200 dark:border-[#2d3154] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#4a5180] focus-visible:ring-0 focus-visible:border-indigo-400 dark:focus-visible:border-[#7b8cde] rounded-xl h-11 pr-11 transition-colors duration-200"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#4a5180] hover:text-gray-600 dark:hover:text-[#a8b2d8] transition-colors"
                        >
                          {showConfirm ? (
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
                    Creating account…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account
                    <Sparkles
                      size={15}
                      className="group-hover:rotate-12 transition-transform"
                    />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-[#4a5180] mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-500 dark:text-[#7b8cde] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
