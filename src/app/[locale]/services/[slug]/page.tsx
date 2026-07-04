export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold text-text-primary capitalize">
          {slug.replace(/-/g, " ")}
        </h1>
      </div>
    </div>
  );
}
