import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./languages";

export const routing = defineRouting({
  locales,
  defaultLocale,
});
