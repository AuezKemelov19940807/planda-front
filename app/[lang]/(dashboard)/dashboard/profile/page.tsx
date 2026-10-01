"use client";

import { useState } from "react";

import { useMutation } from "@apollo/client/react";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useAuthStore } from "@/stores/auth-store";

import { UPDATE_USER_MUTATION } from "@/graphql/mutations/auth/update-user";
import { CHANGE_PASSWORD_MUTATION } from "@/graphql/mutations/auth/change-password";

import { UpdateUserMutationData } from "@/graphql/types/auth";
import { PasswordInput } from "@/components/auth/password-input";

export default function DashboardProfile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  // Profile
  const [name, setName] = useState(user?.name ?? "");

  const [updateUser, { loading }] =
    useMutation<UpdateUserMutationData>(UPDATE_USER_MUTATION);

  // Change password
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changePassword, { loading: changingPassword }] = useMutation(
    CHANGE_PASSWORD_MUTATION,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    try {
      const { data } = await updateUser({
        variables: {
          payload: {
            id: user.id,
            name: name.trim(),
          },
        },
      });

      if (data?.updateUser) {
        setUser(data.updateUser);
        toast.success("Профиль успешно обновлён");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);

      toast.error(
        error instanceof Error ? error.message : "Не удалось обновить профиль",
      );
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Заполните все поля");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Новый пароль должен содержать минимум 8 символов");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    try {
      await changePassword({
        variables: {
          payload: {
            currentPassword,
            newPassword,
          },
        },
      });

      toast.success("Пароль успешно изменён");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setIsPasswordDialogOpen(false);
    } catch (error) {
      console.error("Failed to change password:", error);

      toast.error(
        error instanceof Error ? error.message : "Не удалось изменить пароль",
      );
    }
  };

  const handlePasswordDialogChange = (open: boolean) => {
    setIsPasswordDialogOpen(open);

    if (!open && !changingPassword) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ??
    user?.email?.slice(0, 2).toUpperCase() ??
    "U";

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-2xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Профиль</h1>

          <p className="text-sm text-muted-foreground">
            Управляйте информацией своего аккаунта.
          </p>
        </div>

        {/* Основная информация */}
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>

            <CardDescription>
              Информация, которая используется в вашем аккаунте.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={user?.avatar ?? undefined}
                  alt={user?.name ?? user?.email ?? "Пользователь"}
                />

                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{user?.name || "Без имени"}</p>

                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <Separator className="my-6" />

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Имя */}
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>

                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Введите имя"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input id="email" value={user?.email ?? ""} disabled />

                <p className="text-xs text-muted-foreground">
                  Email нельзя изменить.
                </p>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={
                    loading ||
                    !name.trim() ||
                    name.trim() === (user?.name ?? "")
                  }
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

                  {loading ? "Сохранение..." : "Сохранить изменения"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Безопасность */}
        <Card>
          <CardHeader>
            <CardTitle>Безопасность</CardTitle>

            <CardDescription>
              Управление безопасностью вашего аккаунта.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {user?.hasPassword ? (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Пароль</p>
                  <p className="text-sm text-muted-foreground">
                    Измените пароль своего аккаунта.
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsPasswordDialogOpen(true)}
                >
                  Изменить пароль
                </Button>
              </div>
            ) : (
              <div>
                <p className="font-medium">Пароль</p>
                <p className="text-sm text-muted-foreground">
                  Вы вошли через Google. Пароль PlanDa для этого аккаунта не
                  установлен.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Change password dialog */}
      {user?.hasPassword && (
        <Dialog
          open={isPasswordDialogOpen}
          onOpenChange={handlePasswordDialogChange}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Изменить пароль</DialogTitle>

              <DialogDescription>
                Введите текущий пароль и придумайте новый.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Current password */}
              <div className="space-y-2">
                <Label htmlFor="current-password">Текущий пароль</Label>

                <PasswordInput
                  id="current-password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="Введите текущий пароль"
                  autoComplete="current-password"
                />
              </div>

              {/* New password */}
              <div className="space-y-2">
                <Label htmlFor="new-password">Новый пароль</Label>

                <PasswordInput
                  id="new-password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Минимум 8 символов"
                  autoComplete="new-password"
                />
              </div>

              {/* Confirm password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">
                  Подтвердите новый пароль
                </Label>

                <PasswordInput
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Повторите новый пароль"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handlePasswordDialogChange(false)}
                disabled={changingPassword}
              >
                Отмена
              </Button>

              <Button
                type="button"
                onClick={handleChangePassword}
                disabled={changingPassword}
              >
                {changingPassword && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {changingPassword ? "Изменение..." : "Изменить пароль"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
