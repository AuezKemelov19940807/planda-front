"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

interface GoogleSignInButtonProps {
  onSuccess: (credential: string) => Promise<void>;
  disabled?: boolean;
}

export function GoogleSignInButton({
  onSuccess,
  disabled = false,
}: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (credential: string) => {
    setLoading(true);

    try {
      await onSuccess(credential);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center">
      <GoogleLogin
        onSuccess={(response) => {
          if (!response.credential || disabled || loading) {
            return;
          }

          void handleSuccess(response.credential);
        }}
        onError={() => {
          setLoading(false);
        }}
        useOneTap={false}
      />

      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-background/90">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Loader2 className="h-4 w-4 animate-spin" />
            Входим через Google...
          </div>
        </div>
      )}
    </div>
  );
}
