export class Task{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public userId: string,
        public isDone: boolean = false,
    ){}
}