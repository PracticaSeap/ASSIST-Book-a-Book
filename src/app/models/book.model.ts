export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    isbn: string;
    category: string;
    tag: string;
    image: string;
    is_borrowed: boolean;
    number_of_pages: number;
    virtual_book: string;
    // lend_date: Date;
    // due_date: Date;
}
