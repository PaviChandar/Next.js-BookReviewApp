import { NextResponse } from 'next/server';

import { getBooks } from '@/lib/data';

export async function GET() {
    const books = getBooks().map(book => ({
    id: book.id,
    title: book.title,
    author: book.author,
    averageRating: book.reviews.length ? Number((book.reviews.reduce((s, r) => s + r.rating, 0) / book.reviews.length).toFixed(1)) : null
    }));

    return NextResponse.json(books);
}