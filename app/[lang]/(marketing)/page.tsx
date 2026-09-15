import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations("HomePage");
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 lg:px-5">
        <p> {t("title")} </p>
        <p>Current language: {lang}</p>
      </div>
    </main>
  );
}
