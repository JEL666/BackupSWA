import App from "./app.js"

const target = document.querySelector('#app')

const DUMMY = [
    {
        _id: 1,
        content: 'JS 하ㄱ습하기',
        isCompleted: true
    },
    {
        _id: 2,
        content: 'REact 학스비하기',
        isCompleted: false
    }
];

new App({target})