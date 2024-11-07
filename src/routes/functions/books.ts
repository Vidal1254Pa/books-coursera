import books from "../../mock/book.data";

const getAllBooks = async (callback: (error: Error | null, data?: any) => void) => {
    try {
        const result = await new Promise((resolve) => {
            setTimeout(() => resolve(books), 1000);
        });

        callback(null, result);
    } catch (error) {
        callback(error as Error);
    }
};

const findBookByISBN = (isbn: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const book = books.find(b => b.isbn === isbn);
        if (book) {
            resolve(book);
        } else {
            reject(new Error('Book not found'));
        }
    });
};
const findBooksByAuthor = (author: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const authorBooks = books.filter(b => b.author === author);
        if (authorBooks.length > 0) {
            resolve(authorBooks);
        } else {
            reject(new Error('No books found for this author'));
        }
    });
};
const findBooksByTitle = (title: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const titleBooks = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
        if (titleBooks.length > 0) {
            resolve(titleBooks);
        } else {
            reject(new Error('No books found with this title'));
        }
    });
};

export {getAllBooks, findBookByISBN, findBooksByAuthor, findBooksByTitle};