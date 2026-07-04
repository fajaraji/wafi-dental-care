export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-text-muted">Coming soon</p>
      </div>
    </div>
  );
}
