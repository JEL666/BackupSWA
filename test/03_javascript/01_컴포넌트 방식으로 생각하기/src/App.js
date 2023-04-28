import Header from './Header.js'
import ToDoForm from './ToDoForm.js'
import ToDoList from './ToDoList.js'
import { setItem } from './storage.js'

export default function App({$target, initialState}){

    new Header({
        $target,
        text: 'Simple ToDo List'
    })
    
    new ToDoForm({
        $target,
        onSubmit: (text) => {
            const nextState = [...todolist.state, {text}]
            todolist.setState(nextState)

            setItem("todos", JSON.stringify(nextState))
        }
    })

    const todolist = new ToDoList({
        $target,
        initialState
    })
}