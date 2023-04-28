let data = [
    {
        text: 'Javascript'
    },
    {
        text: 'React.js'
    }
];

const initialState = JSON.parse(localStorage.getItem('todos'));

const KEY = 'LOCALSTORAGE_KEY';
const $app = document.querySelector('.app');

function Header({ $target, text }) {
    const $header = document.createElement('h1');
    $header.innerHTML = text;
    $target.appendChild($header);

    this.render = () => {
        $header.textContent = text;
    };

    this.render();
}

new Header({ $target: $app, text: '헤더' });

function ToDoList({ $target, initialState }) {
    const $todoList = document.createElement('ul');
    $target.appendChild($todoList);
    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        $todoList.innerHTML = `
            ${this.state.map(({ text }) => `<li>${text}</li>`).join('')}
        `;
    };

    this.render();
}

const toDoList = new ToDoList({ $target: $app, initialState: data });

function ToDoForm({ $target, onSubmit }) {
    const $form = document.createElement('form');
    $target.appendChild($form);

    this.render = () => {
        $form.innerHTML = `
            <input class="text" type="text">
            <button>제출</button>
        `;
    }

    this.render();

    $form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = $form.querySelector('.text').value;
        if (input) {
            onSubmit(input);
        }
        $form.querySelector('.text').value = '';
    })
}
const setState = (nextState) => {
    data = [
        ...data,
        {
            text: nextState
        }
    ]
    toDoList.setState(data);
};

new ToDoForm({
    $target: $app,
    onSubmit: (text) => {
        setState(text);
        localStorage.setItem('todos', JSON.stringify(text));
    }
});
