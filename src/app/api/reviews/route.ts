import { NextResponse } from 'next/server';
import z from "zod"

import { addReview, getBookById } from '@/lib/data';

const ReviewSchema = z.object({
    bookId: z.string().nonempty(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(1).max(500)
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = ReviewSchema.parse(body);

        const book = getBookById(parsed.bookId);
        if (!book) return NextResponse.json({ message: 'Book not found' }, { status: 404 });

        const newReview = { id: `r${Date.now()}`, rating: parsed.rating, comment: parsed.comment };
        addReview(parsed.bookId, newReview);

        return NextResponse.json(newReview, { status: 201 });
    } catch (err: any) {
        if (err.name === 'ZodError') {
            return NextResponse.json({ message: 'Invalid input', errors: err.errors }, { status: 400 });
        }
            return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}