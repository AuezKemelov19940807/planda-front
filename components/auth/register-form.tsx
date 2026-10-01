"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ArrowLeft, Mail, User } from "lucide-react";

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

import { PasswordInput } from "@/components/auth/password-input";
import { SIGN_UP } from "@/graphql/mutations/auth/sign-up";

import { SignUpResponse, SignUpVariables } from "@/graphql/types/auth";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const [signUp, { loading, error }] = useMutation<
    SignUpResponse,
    SignUpVariables
  >(SIGN_UP);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidationError("");

    // Проверяем совпадение паролей
    if (password !== confirmPassword) {
      setValidationError("Пароли не совпадают.");
      return;
    }

    // Проверяем длину пароля
    if (password.length < 6) {
      setValidationError("Пароль должен содержать минимум 6 символов.");
      return;
    }

    try {
      const result = await signUp({
        variables: {
          payload: {
            name: name.trim(),
            email: email.trim(),
            password,
            avatar: "",
          },
        },
      });

      const user = result.data?.signUp;

      if (!user) {
        setValidationError("Не удалось создать аккаунт.");
        return;
      }

      // После регистрации переходим на страницу входа
      router.replace("/auth/login");
    } catch {
      // Ошибка отображается через Apollo error
    }
  };

  const submitError = validationError || error;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <Link href="/" className="mx-auto text-2xl font-bold tracking-tight">
            PlanDa
          </Link>

          <div>
            <CardTitle className="text-2xl">Создать аккаунт</CardTitle>

            <CardDescription className="mt-2">
              Зарегистрируйтесь в PlanDa
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="name"
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="pl-9"
                  autoComplete="name"
                  required
                />
              </div>
            </div>

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
              <Label htmlFor="password">Пароль</Label>

              <PasswordInput
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Подтвердите пароль</Label>

              <PasswordInput
                id="confirm-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            {/* Error */}
            {submitError && (
              <p className="text-sm text-destructive">
                {validationError ||
                  "Не удалось создать аккаунт. Возможно, пользователь с таким email уже существует."}
              </p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Войти
            </Link>
          </p>

          {/* Back to home */}
          <div className="mt-4 text-center">
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
