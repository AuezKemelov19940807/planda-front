"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { GoogleLogin } from "@react-oauth/google";
import { ArrowLeft, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Link, useRouter } from "@/i18n/navigation";

import { SIGN_IN } from "@/graphql/mutations/auth/sign-in";
import { GOOGLE_SIGN_IN } from "@/graphql/mutations/auth/google-sign-in";

import { PasswordInput } from "@/components/auth/password-input";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { loading: signInLoading, error: signInError }] =
    useMutation(SIGN_IN);

  const [googleSignIn, { loading: googleLoading, error: googleError }] =
    useMutation(GOOGLE_SIGN_IN);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signIn({
        variables: {
          email,
          password,
        },
      });

      router.replace("/dashboard");
    } catch {
      // Error is handled by Apollo state.
    }
  };

  const handleGoogleSuccess = async (credential: string) => {
    try {
      await googleSignIn({
        variables: {
          credential,
        },
      });

      router.replace("/dashboard");
    } catch {
      // Error is handled by Apollo state.
    }
  };

  const loading = signInLoading || googleLoading;
  const error = signInError || googleError;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <Link href="/" className="mx-auto text-2xl font-bold tracking-tight">
            PlanDa
          </Link>

          <div>
            <CardTitle className="text-2xl">Добро пожаловать</CardTitle>

            <CardDescription className="mt-2">
              Войдите в свой аккаунт PlanDa
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(response) => {
                if (response.credential) {
                  void handleGoogleSuccess(response.credential);
                }
              }}
              onError={() => {
                console.error("Google Login failed");
              }}
              useOneTap={false}
            />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">или</span>
            </div>
          </div>

          {/* Email / Password */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="pl-9"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  Забыли пароль?
                </Link>
              </div>

              <PasswordInput
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-destructive">
                Не удалось выполнить вход. Проверьте данные и попробуйте снова.
              </p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {signInLoading ? "Вход..." : "Войти"}
            </Button>
          </form>

          {/* Register */}
          <p className="text-center text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Зарегистрироваться
            </Link>
          </p>

          {/* Back */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Вернуться на главную
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
