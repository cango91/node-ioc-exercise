import IDbConnection from "./application/services/IDbConnection";
import { container } from "./infrastructure/ConfigureInversify";
import { Server } from "./infrastructure/web/server";
import { TYPES } from "./types";

async function startApplication() {
    require('dotenv').config();
    const dbConnection = container.get<IDbConnection>(TYPES.IDbConnection);
    await dbConnection.connect(process.env.DB_URL!);
    const server = new Server(container);
    await server.start();
}

startApplication().catch(error => {
    console.error('Application failed to start', error);
    process.exit(1);
})