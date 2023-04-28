import TodoList from "./TodoList.js";
import TodoComments from "./TodoComments.js"
import { request } from "./api.js";

export default function App({$app}){

    this.state = {
        todos: [],
        selectedTodo: null,
        comments: []
    }

    this.setState = nextState => {
        this.state = nextState
        todoList.setState(this.state.todos)
    }
    const todoList = new TodoList({
        $target: $app,
        initialState: this.todos
    })
    
    const todoComments = new TodoComments({
        $target: $app,
        initialState: {
            selectedTodo: {
                text: 'Learning Javascript'
            },
            comments: [
                {
                    text: '안녕하세요'
                },
                {
                    text: '반가워요'
                }
            ]
        }
    })
    //todos 불러오기
    this.init = () => {
        request('http://localhost:3000/todos', (todos) => {
            this.setState({
                ...this.state,
                todos
            })
        })
    }
    this.init()
}