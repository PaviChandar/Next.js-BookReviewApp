'use client';

import Link from 'next/link';
import { FC } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BookCardProps {
    book: {
        id: string;
        title: string;
        author: string;
        averageRating: number | null;
    };
}

const BookCard: FC<BookCardProps> = ({ book }) => {
    return (
        <div>
            <Card className="rounded-2xl" >
                <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                    <p className="mt-2">Average rating: {book.averageRating ?? '—'}</p>
                </CardContent>
                <CardFooter className="p-4">
                    <Link href={`/books/${book.id}`}>
                        <Button>Details</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default BookCard;