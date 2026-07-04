import { getTranslations } from "next-intl/server";

export default async function ServicesPage() {
  const t = await getTranslations("home");

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold text-text-primary">
          {t("services.title")}
        </h1>
        <p className="mt-4 text-lg text-text-muted">
          {t("services.subtitle")}
        </p>
      </div>
    </div>
  );
}
