import BookCard from '@/components/BookCard';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from '@/components/Logout';
import ProfileMenu from '@/components/Profile';
import { SessionProvider } from 'next-auth/react';

async function getBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, { next: { revalidate: 10 } });
  return res.json();
}

const Home = async() => {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const books = await getBooks();
  return (
  <div className="p-4">
    <div className="flex justify-end items-center gap-4 mb-6">
      <ProfileMenu />
      <LogoutButton />
    </div>

    <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {books.map((book: any) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  </div>
);

}

export default Home