export default interface IDbConnection {
    connect: (connectionString: string) => Promise<void>;
}