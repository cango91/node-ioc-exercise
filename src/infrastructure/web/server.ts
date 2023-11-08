import path from 'path';
import express, { Application } from 'express';
import registerRoutes from './routes';
import morgan from 'morgan';
import { Container } from 'inversify';
import cors from 'cors';
import ITokenService from '../../application/services/ITokenService';
import { TYPES } from '../../types';
import bearerMiddlewareFactory from './middleware/bearer';

export class Server {
    private app: Application;

    constructor(private container: Container) {
        this.app = express();
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
        const tokenService = container.get<ITokenService>(TYPES.ITokenService);
        const bearerMiddleware = bearerMiddlewareFactory(tokenService);
        this.app.use(bearerMiddleware);
        const router = registerRoutes(container);
        this.app.use(router);
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.get('*', (req,res) =>{
            res.sendFile(path.join(__dirname,'public','index.html'));
        });
    }
    public async start(): Promise<void> {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        })
    }
}