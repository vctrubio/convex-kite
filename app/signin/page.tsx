"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const { signUp } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Separate sign up handler
  async function handleSignUp(formData: FormData) {
    try {
      await signUp("password", formData);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  }

  // Separate sign in handler
  async function handleSignIn(formData: FormData) {
    try {
      await signIn("password", formData);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-8 w-[28rem] mx-auto h-screen justify-center items-center">
      <div className="flex flex-row gap-4 mb-4">
        <button
          className={`px-8 py-3 text-lg font-bold rounded-lg transition-all ${flow === "signIn"
            ? "bg-blue-600 text-white shadow-lg scale-105"
            : "bg-slate-200 text-slate-700"
            }`}
          onClick={() => {
            setFlow("signIn");
            setError(null);
          }}
        >
          Sign In
        </button>
        <button
          className={`px-8 py-3 text-lg font-bold rounded-lg transition-all ${flow === "signUp"
            ? "bg-green-600 text-white shadow-lg scale-105"
            : "bg-slate-200 text-slate-700"
            }`}
          onClick={() => {
            setFlow("signUp");
            setError(null);
          }}
        >
          Sign Up
        </button>
      </div>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          setError(null);
          if (flow === "signIn") {
            await handleSignIn(formData);
          } else {
            await handleSignUp(formData);
          }
        }}
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          {flow === "signIn" ? "Kite School Management 101" : "Create Your Account"}
        </h2>
        <input
          className="bg-background text-foreground rounded-md p-3 border-2 border-slate-200 dark:border-slate-800 text-lg"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="bg-background text-foreground rounded-md p-3 border-2 border-slate-200 dark:border-slate-800 text-lg"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button
          className={`rounded-lg py-3 text-lg font-bold transition-all ${flow === "signIn"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-green-600 text-white hover:bg-green-700"
            }`}
          type="submit"
        >
          Continue
        </button>
        <div className="flex flex-row gap-2 justify-center mt-2">
          <span
            className="text-blue-600 underline hover:no-underline cursor-pointer font-semibold"
            onClick={() => {
              setFlow(flow === "signIn" ? "signUp" : "signIn");
              setError(null);
            }}
          >
          </span>
        </div>
        {error && (
          <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2 mt-2">
            <p className="text-foreground font-mono text-xs">
              Error: {error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}