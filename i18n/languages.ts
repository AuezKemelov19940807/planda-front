export const languages = [
  { code: "ru", label: "Русский" },
  { code: "kk", label: "Қазақша" },
  { code: "en", label: "English" },
] as const;

export const locales = languages.map((language) => language.code);

export const defaultLocale = "kk";

export type Locale = (typeof locales)[number];
