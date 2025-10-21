'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ReviewFormProps {
    bookId: string;
}

const ReviewForm = ({ bookId }: ReviewFormProps) => {
    const router = useRouter()

    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookId, rating: Number(rating), comment })
            });
            const data = await res.json();
            if (!res.ok) throw data;
            setComment('');
            setRating(5);
        } catch (err: any) {
            setError(err?.message || 'Failed to submit');
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <form onSubmit={submit} className="space-y-3">
                <label className="block">
                <div className="text-sm mb-1">Rating (1-5)</div>
                <Input type="number" min={1} max={5} value={rating} onChange={e => setRating(Number(e.target.value))} className="w-28" />
                </label>

                <label className="block">
                <div className="text-sm mb-1">Comment</div>
                <Textarea value={comment} onChange={e => setComment(e.target.value)} rows={4} />
                </label>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Add Review'}</Button>
                <Button onClick={() => router.back()} >Go Back</Button>
            </form>
        </>
    );
}

export default ReviewForm