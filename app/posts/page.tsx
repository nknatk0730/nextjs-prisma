import { createPost } from "@/actions/actions";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function Page() {
  const posts = await prisma.post.findMany();

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">All Posts ({posts.length})</h1>

      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between px-5">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <form className="flex flex-col gap-y-2" action={createPost}>
        <input type="text" className="px-2 py-1 rounded-sm" placeholder="Title" name="title" />
        <textarea name="content" rows={5} placeholder="Content" className="px-2 py-1 rounded-sm" />
        <button
          className="bg-blue-400 py-2 text-white rounded-sm"
          type="submit"
        >
          Create post
        </button>
      </form>
    </main>
  );
}
