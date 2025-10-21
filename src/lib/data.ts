import { Book, Review } from "./type";

let books: Book[] = [
    {
        id: '1',
        title: 'A Christmas Carol',
        author: 'Charles Dickens',
        description: 'A transformative story of Ebenezer Scrooge, a curmudgeonly miser who despises Christmas and is indifferent to the struggles of others.',
        reviews: [
            { id: 'r1', rating: 5, comment: 'Favourite of all time' },
            { id: 'r2', rating: 4, comment: 'Heartwarming and mostly recommended' }
        ]
    },
    {
        id: '2',
        title: '2 states',
        author: 'Chetan Bhagat',
        description: 'Well written and entertaining',
        reviews: [
            { id: 'r3', rating: 5, comment: 'Changed how I code.' }
        ]
    }
];

export const getBooks = (): Book[] => books;

export const getBookById = (id: string): Book | undefined => books.find(book => book.id === id);

export const addReview = (bookId: string, review: Review): Review | null => {
    const book = books.find(book => book.id === bookId);
    if (!book) return null;
    book.reviews.push(review);
    return review;
};