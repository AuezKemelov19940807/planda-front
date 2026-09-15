"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages } from "@/i18n/languages";

export function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
        <Languages className="h-5 w-5" />
        <span className="sr-only">Change language</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
          >
            {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
