import z from "zod"

import { addReview, getBookById } from '@/lib/data';
import { jsonResponse } from '@/lib/utils';

const ReviewSchema = z.object({
    bookId: z.string().nonempty(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(1).max(500)
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = ReviewSchema.parse(body);

        const book = getBookById(parsed.bookId);
        if (!book) {
            return jsonResponse('Book not found', 404);
        }

        const newReview = {
            id: `r${Date.now()}`,
            rating: parsed.rating,
            comment: parsed.comment,
        };

        addReview(parsed.bookId, newReview);
        return jsonResponse(newReview, 201);
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            return jsonResponse({ message: 'Invalid input', errors: err.errors }, 400);
        }
            return jsonResponse('Server error', 500);
    }
}