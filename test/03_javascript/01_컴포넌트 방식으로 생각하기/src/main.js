import App from "./App.js"
import { getItem } from "./storage.js"

const data = [
    {
        text: 'Javascript 공부하기'
    },
    {
        text: 'Javascript 복습하기'
    }
]


const initialState = getItem("todos", [])
const $app = document.querySelector('.app')

new App({
    $target: $app,
    initialState
})