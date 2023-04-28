import todoform from "./todoform.js";
import todolist from "./todolist.js"
import header from "./header.js";
import { request } from "./api.js";
import userlist from "./userlist.js";
import { parse } from "./querystring.js";

export default function App({target}){
    const userListContainer = document.createElement('div');
    const todoListContainer = document.createElement('div');

    target.append(userListContainer);
    target.append(todoListContainer);

    this.state = {
        userList: [],
        selectedUsername: null,
        todos: [],
        isLoading: true
    }
    const userList = new userlist({
        target: userListContainer,
        initialState: this.state.userList,
        onSelect: async (username) => {
            history.pushState(null, null, `/?selectedUsername=${username}`)
            this.setState ({
                ...this.state,
                selectedUsername: username
            })
            await await fetchTodos()
        }
        }
    )
    new header({
        target: todoListContainer,
        initialState: {
            isLoading: this.state.isLoading,
            selectedUsername: this.state.selectedUsername
        }
    })

    new todoform({
        target: todoListContainer,
        onSubmit: async (content) => {
            const toDo = {
                content,
                isCompleted: false
            }
            this.setState({
                ...this.state,
                todos: [
                    ...this.state.todos,
                    toDo
                ]
            })
            await request(`/${this.state.selectedUsername}`, {
                method: "POST",
                body: JSON.stringify(toDo)
            })
            await fetchTodos();
        }
    })

    this.setState = (nextState) => {
        this.state = nextState;
        toDoList.setState({
            todos: this.state.todos,
            isLoading: false,
            selectedUsername: this.state.selectedUsername
        });
        userList.setState(this.state.userList);
        this.render();
    }

    this.render = () => {
        const { selectedUsername } = this.state;
        todoListContainer.style.display = selectedUsername ? 'block' : 'none';
    }
    const toDoList = new todolist({
        target: todoListContainer,
        initialState: {
            todos: this.state.todos,
            isLoading: this.state.isLoading,
            selectedUsername: this.state.selectedUsername
        },
        onToggle: async (id) => {
            await request(`/${this.state.selectedUsername}/${id}/toggle`, {
                method: 'PUT'
            })
            await fetchTodos()
        },
        onRemove: async (id) => {
            const todoIndex = this.state.todos.findIndex(todo => todo._id === id);

            await request(`/${this.state.selectedUsername}/${id}`, {
                method: 'DELETE'
            })
            await fetchTodos()
        }
    })
    const fetchUserList = async () => {
        const userList = await request(`/users`);
        this.setState({
            ...this.state,
            userList
        })

    }
    const fetchTodos = async () => {
        const { selectedUsername } = this.state;
        if (selectedUsername) {
            this.setState({
                ...this.state,
                isLoading: true 
            });
            const todos = await request(`/${selectedUsername}`);
            this.setState({
                ...this.state,
                todos,
                isLoading: false
            });
        }
    }

    const init = async () => {
        await fetchUserList()

        const { search } = location;
        if (search.length > 0) {
            const { selectedUsername } = parse(search.substring(1));
            if (selectedUsername) {
                this.setState({
                    ...this.state,
                    selectedUsername
                })
                await fetchTodos();
            }
        }
    }

    this.render();
    init();

    window.addEventListener('popstate', () => {
        init();
    })
}