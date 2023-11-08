import { injectable } from "inversify";
import { DataSource } from "typeorm";
import IDbConnection from "../../../application/services/IDbConnection";

@injectable()
export default class TypeORMConnectionHandler implements IDbConnection{
    dataSource: DataSource;
    private initialized = false;

    constructor(){
        this.dataSource = new DataSource({
            type: "postgres",
            url: "",
            synchronize: true,
            logging: true
        });
    }

    connect = async (uri:string) =>{
        this.dataSource.setOptions({url: uri});
        try {
            if(this.initialized) return this.dataSource;
            await this.dataSource.initialize();
            console.log("Connected to PostgreSQL");
            this.initialized = true;
            return this.dataSource;
        } catch (error) {
            console.log("Error connecting to PostgreSQL ", error);
            process.exit(1);
        }
    }
}