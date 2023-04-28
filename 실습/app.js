import ToDoList from "./todolist.js";

export default class App {
    constructor({ target }) {
        this.state = {
            target,
            initialState: []
        };
        const ulElement = document.createElement('div');
        target.appendChild(ulElement);

        this.toDoList = new ToDoList({
            target,
            initialState: []
        });
    }

    setState(nextState) {
        this.state = nextState;
        this.toDoList.setState({
            ...this.state
        });
    }
}