import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 lg:px-5">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p>{t("description")}</p>
      </div>
    </main>
  );
}
