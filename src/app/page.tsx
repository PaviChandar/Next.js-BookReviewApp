import BookCard from '@/components/BookCard';

async function getBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, { next: { revalidate: 10 } });
  return res.json();
}

const Home = async() => {

  const books = await getBooks();
  return (
    <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {books.map((book: any) => (
      <BookCard key={book.id} book={book} />
      ))}
    </section>
  );
}

export default Home