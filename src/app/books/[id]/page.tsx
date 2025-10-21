import ReviewForm from '@/components/ReviewForm';

async function getBook(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`, { next: { revalidate: 10 } });
    if (res.status === 404) return null;
    return res.json();
}

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`);
    const books = await res.json();
    return books.map((book: any) => ({ id: book.id }));
}

const BookPage = async({ params }: { params: { id: string } }) => {
    const book = await getBook(params.id); 
    if (!book) return <p>Book not found</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
            <p className="mt-4">{book.description}</p>
            <section className="mt-6">
            <h2 className="text-lg font-semibold">Reviews</h2>
                {book.reviews.length === 0 && <p>No reviews yet.</p>}
                    <ul className="space-y-3 mt-3">
                        {book.reviews.map((review: any) => (
                            <li key={review.id} className="p-3 rounded border">
                                <div>Rating: {review.rating}</div>
                                <div className="text-sm mt-1">{review.comment}</div>
                            </li>
                        ))}
                    </ul>
            </section>
            <section className="mt-6">
            <h3 className="text-lg">Add a review</h3>
            <ReviewForm bookId={book.id} />
            </section>
        </div>
    );
}

export default BookPage