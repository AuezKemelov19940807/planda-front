"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  id?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function PasswordInput({
  id = "password",
  value,
  onChange,
  placeholder = "••••••••",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pr-10"
        autoComplete="current-password"
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
