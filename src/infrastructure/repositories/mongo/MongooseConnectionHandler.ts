import mongoose from "mongoose";
import IDbConnection from "../../../application/services/IDbConnection";
import { injectable } from "inversify";

@injectable()
export default class MongooseConnectionHandler implements IDbConnection{

    connect = async (uri: string) => {
        try {
            await mongoose.connect(uri);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error('Error connecting to MongoDB', error);
            process.exit(1);
        }
    }

}