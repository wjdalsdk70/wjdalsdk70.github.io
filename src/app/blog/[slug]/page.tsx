import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);
  
  return files.map((file) => ({
    slug: file.replace(".mdx", ""),
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "posts", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);

  return (
    <article className="prose mx-auto p-6">
      <h1>{data.title}</h1>
      <p className="text-gray-500">{data.date}</p>
      <div className="mt-6" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
