import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  description: string;
  slug: string;
}

export default function BlogPage() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);

  const posts: Post[] = files.map((file) => {
    const content = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data } = matter(content);
    return { ...data, slug: file.replace(".mdx", "") } as Post;
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📒 Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-2">
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold text-blue-600">
              {post.title}
            </Link>
            <p className="text-gray-500 text-sm">{post.date}</p>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
