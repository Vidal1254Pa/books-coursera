import express from "express";
import books from "../mock/book.data";
import {findBookByISBN, findBooksByAuthor, findBooksByTitle, getAllBooks} from "./functions/books";

const router = express.Router();

router.get('/', (req, res) => {
    res.send(books);
});
router.get('/all', (req, res) => {
    getAllBooks((error, data) => {
        if (error) {
            res.status(500).json({message: 'Error retrieving books', error});
        } else {
            res.json({books: data});
        }
    });
});
router.get('/new/:isbn', (req, res) => {
    const {isbn} = req.params;

    findBookByISBN(isbn)
        .then(book => {
            res.json(book);
        })
        .catch(error => {
            res.status(404).json({message: error.message});
        });
});
router.get('/new/author/:author', (req, res) => {
    const {author} = req.params;
    findBooksByAuthor(author)
        .then(books => {
            res.json(books);
        })
        .catch(error => {
            res.status(404).json({message: error.message});
        });
});
router.get('/new/title/:title', (req, res) => {
    const {title} = req.params;
    findBooksByTitle(title)
        .then(books => {
            res.json(books);
        })
        .catch(error => {
            res.status(404).json({message: error.message});
        });
});
router.get('/:isbn', (req, res) => {
        const {isbn} = req.params;
        const book = books.find(book => book.isbn === isbn);
        if (book) {
            res.send(book);
        } else {
            res.status(404).send({message: 'Book not found'});
        }
    }
);
router.get('/autor/:author', (req, res) => {
        const {author} = req.params;
        const book = books.filter(book => book.author === author);
        if (book) {
            res.send(book);
        } else {
            res.status(404).send({message: 'Book not found'});
        }
    }
);
router.get('/title/:title', (req, res) => {
        const {title} = req.params;
        const book = books.find(book => book.title === title);
        if (book) {
            res.send(book);
        } else {
            res.status(404).send({message: 'Book not found'});
        }
    }
);
router.get('/:isbn/reviews', (req, res) => {
        const {isbn} = req.params;
        const book = books.find(book => book.isbn === isbn);
        if (book) {
            res.send(book.reviews);
        } else {
            res.status(404).send({message: 'Book not found'});
        }
    }
);
router.post('/:isbn/reviews', (req, res) => {
        const {isbn} = req.params;
        const {name, review} = req.body;
        const book = books.find(book => book.isbn === isbn);
        if (book) {
            // @ts-ignore
            book.reviews[name] = review;
            res.status(201).send({message: 'Review added successfully', data: book.reviews});
        } else {
            res.status(404).send({message: 'Book not found'});
        }
    }
);

router.delete('/:isbn/reviews/:name', (req, res) => {
        const {isbn, name} = req.params;
        const book = books.find(book => book.isbn === isbn);
        if (book) {
            // @ts-ignore
            delete book.reviews[name];
            res.send({message: 'Review deleted successfully', data: book.reviews});
        } else {
            res.status(404).send({message: 'Book not found'});
        }
    }
);

export default router;