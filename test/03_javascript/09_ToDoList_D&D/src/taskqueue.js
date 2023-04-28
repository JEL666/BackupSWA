

export default class TaskQueue {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.run()
    }

    async run() {
        if (this.tasks.length > 0) {
            const task = this.tasks.shift();
            await task()
            this.run()
        }
    }
}