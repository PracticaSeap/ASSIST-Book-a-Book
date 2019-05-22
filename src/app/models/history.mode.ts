// export interface History {
//     book_id : string;
//     due_date : Date;
//     initial_date : Date;
//     returned_date : Date;
//     user_email : string;
// }
export interface HistoryEntry {
    bookKey: string;
    initialDate: string;
    dueDate: Date;
    returnDate: Date;
    userKey: string;
}