import {configDotenv} from "dotenv";

configDotenv();

import express, {Request, Response} from 'express';
import booksRouter from "./routes/books";
import usersRouter from "./routes/users";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.listen(parseInt(PORT.toString()), "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
