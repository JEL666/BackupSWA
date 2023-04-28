import { request } from "./api.js";
import ToDoList from "./todolist.js";
import TaskQueue from "./taskqueue.js";
import SyncTaskManager from "./synctaskmanager.js";

export default class App {
    constructor({ target }) {
        const tasks = new SyncTaskManager();

        this.state = {
            todos: []
        };
        const handleTodoDrop = async (todoId, updateValue) => {
            const nextTodos = [...this.state.todos];
            const todoIndex = nextTodos.findIndex(todo => todo._id === todoId)
            nextTodos[todoIndex].isCompleted = updateValue;
            this.setState({
                ...this.state,
                todos: nextTodos
            });
        };

        const handleTodoRemove = (todoId) => {
            const nextTodos = [...this.state.todos];

            const todoIndex = nextTodos.findIndex(todo => todo._id === todoId);

            nextTodos.splice(todoIndex, 1);

            this.setState({
                ...this.state,
                todos: nextTodos
            });
            
            tasks.removeTask(`/${todoId}`);
            tasks.addTask({
                url: `/${todoId}`,
                method: 'DELETE'
            });
        };
        this.incompletedToDoList = new ToDoList({
            target,
            initialState: {
                title: '완료되지 않은 일들',
                todos: []
            },
            onDrop: async (toDoId) => {
                handleTodoDrop(toDoId, false);
                // const todos = await request(`/${toDoId}/toggle`, {
                //     method: 'PUT'
                // });
                // tasks.addTask(async () => {
                //     await this.fetchTodos();
                // })

                tasks.addTask({
                    url: `/${toDoId}/toggle`,
                    method: 'PUT'
                });
            },
            onRemove: (toDoId) => {
                handleTodoRemove(toDoId);
            }
        });

        this.completedTodoList = new ToDoList({
            target,
            initialState: {
                title: '완료된 일들',
                todos: []
            },
            onDrop: async (toDoId) => {
                handleTodoDrop(toDoId, true);
                // const todos = await request(`/${toDoId}/toggle`, {
                //     method: 'PUT'
                // });
                // tasks.addTask(async () => {
                //     await this.fetchTodos();
                // })
                tasks.addTask({
                    url: `/${toDoId}/toggle`,
                    method: 'PUT'
                });
            },
            onRemove: (toDoId) => {
                handleTodoRemove(toDoId);
            }
        });

        this.fetchTodos();

        const button = document.createElement('button');
        button.textContent = '변경내용 동기화';
        target.appendChild(button);
        button.addEventListener('click', () => tasks.run())
    }
    setState(nextState) {
        this.state = nextState;

        const { todos } = this.state;
        
        this.incompletedToDoList.setState({
            ...this.incompletedToDoList,
            todos: todos.filter(todo => !todo.isCompleted)
        });

        this.completedTodoList.setState({
            ...this.completedTodoList,
            todos: todos.filter(todo => todo.isCompleted)
        });
    }

    async fetchTodos() {
        const todos = await request('');
        this.setState({
            ...this.state,
            todos
        });
    }
}