import BlogForm from "../BlogForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h2 className="text-xl font-extrabold text-text-primary font-display mb-6">
        Artikel Baru
      </h2>
      <BlogForm />
    </div>
  );
}
