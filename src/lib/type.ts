export interface Review {
    id: string;
    rating: number;
    comment: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    reviews: Review[];
}