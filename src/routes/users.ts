import express from "express";
import users from "../mock/user.data";
import {getAllBooks} from "./functions/books";

const router = express.Router();

router.post('/register', (req, res) => {
        const {username, password} = req.body;
        const userExists = users.some(u => u.username === username);
        if (userExists) {
            res.status(400).json({message: 'User already exists'});
        } else {
            users.push({id: users.length + 1, username, password});
            res.status(201).json({message: 'User registered successfully'});
        }
    }
);

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({message: 'Login successful'});
    } else {
        res.status(401).json({message: 'Invalid credentials'});
    }
});

export default router;