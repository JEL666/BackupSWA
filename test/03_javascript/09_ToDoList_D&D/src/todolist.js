export default class ToDoList {
    constructor({ target, initialState, onDrop, onRemove }) {
        this.toDoList = document.createElement('div');
        this.toDoList.setAttribute('droppable', true);
        target.appendChild(this.toDoList);

        this.state = initialState;
        this.render();

        this.toDoList.addEventListener('dragstart', (e) => {
            const li = e.target.closest('li');
            e.dataTransfer.setData('todoId', li.dataset.id);
            //e.dataTransfer.setDragImage(li.text, 0, 0);
            //console.log('Drag event: ' + li.dataset.id);
        })
        this.toDoList.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        })

        this.toDoList.addEventListener('drop', (e) => {
            e.preventDefault();
            const droppedTodoId = e.dataTransfer.getData('todoId');

            const { todos } = this.state;
            if (!todos.find(todo => todo._id === droppedTodoId)) {
                onDrop(droppedTodoId);
            }
            //console.log('Drop event: ' + e.dataTransfer.getData('todoId'));
        })

        this.toDoList.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const li = e.target.closest('li');
                if (li) {
                    onRemove(li.dataset.id);
                }
            }
        });
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const { title, todos = [] } = this.state;
        this.toDoList.innerHTML = `
            <h2>${title}</h2>
            <ul>
                ${todos.map(todo => `<li data-id="${todo._id}" draggable="true">${todo.content} <button>X</button></li>`).join('')}
            </ul>
            ${todos.length === 0 ? '설정된 일이 없습니다' : ''}
        `;
    }
}