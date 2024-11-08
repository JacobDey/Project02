import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

export class App {
    constructor(controllers, port) {
        this.app = express();
        this.port = port;
        this.#connectDB();
        this.#initCorsMiddleWare();
        this.#initMiddleWares();
        this.#initControllers(controllers);
    }

    #connectDB() {
        mongoose
            .connect(process.env.NODE_ENV === "DEV" ? process.env.DEVDB : process.env.MONGDB_URI)
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Error occurred while connecting to MongoDB', err));
    }

    #initMiddleWares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    #initCorsMiddleWare() {
        this.app.use(cors());
    }

    #initControllers(controllers) {
        for (const controller of controllers) {
            this.app.use('/', controller.router);
        }
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port', this.port);
        });
    }
}