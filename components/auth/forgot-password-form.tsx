"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

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
import { FORGOT_PASSWORD } from "@/graphql/mutations/auth/forgot-password";

interface ForgotPasswordResponse {
  forgotPassword: {
    message: string;
  };
}

interface ForgotPasswordVariables {
  email: string;
}

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [forgotPassword, { loading, error }] = useMutation<
    ForgotPasswordResponse,
    ForgotPasswordVariables
  >(FORGOT_PASSWORD);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      return;
    }

    try {
      await forgotPassword({
        variables: {
          email: normalizedEmail,
        },
      });

      router.push(
        `/auth/reset-password?email=${encodeURIComponent(normalizedEmail)}`,
      );
    } catch {
      // Error is handled by Apollo state.
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <Link href="/" className="mx-auto text-2xl font-bold tracking-tight">
            PlanDa
          </Link>

          <div>
            <CardTitle className="text-2xl">Забыли пароль?</CardTitle>

            <CardDescription className="mt-2">
              Введите email, и мы отправим вам код для восстановления пароля.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">
                {error.message.includes("Google sign-in")
                  ? "Этот аккаунт использует вход через Google. Войдите с помощью Google."
                  : "Не удалось отправить код. Проверьте email и попробуйте снова."}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Отправка...
                </>
              ) : (
                "Отправить код"
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Вернуться ко входу
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
