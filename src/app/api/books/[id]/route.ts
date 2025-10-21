import { NextResponse } from 'next/server';
import { getBookById } from '@/lib/data';

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const book = getBookById(params.id);
    if (!book) return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    const avg = book.reviews.length ? book.reviews.reduce((s, r) => s + r.rating, 0) / book.reviews.length : null;

    return NextResponse.json({ ...book, averageRating: avg ? Number(avg.toFixed(1)) : null });
}