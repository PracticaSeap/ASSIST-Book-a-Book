export interface Book {
    key: string;
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
    // is_borrowed: string;
}

export interface BookHistory extends Book  {
    initialDate: string;
    returnDate: string;
    dueDate: string;
    userKey: string;
    userFullName: string;
}
