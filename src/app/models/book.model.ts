export interface Book {
    $key: string;
    id: number;
    key: number;
    title: string;
    author: string;
    description: string;
    isbn: string;
    category: string;
    tag: string;
    image: string;
    number_of_pages: number;
    virtual_book: string;
    is_borrowed: boolean;
}
