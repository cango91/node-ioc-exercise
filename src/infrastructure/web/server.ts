import express, { Application } from 'express';
import registerRoutes from './routes';
import morgan from 'morgan';
import { Container } from 'inversify';

export class Server {
    private app: Application;

    constructor(private container: Container) {
        this.app = express();
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        const router = registerRoutes(container);
        this.app.use(router);
    }
    public async start(): Promise<void> {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        })
    }
}