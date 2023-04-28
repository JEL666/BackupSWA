
export default function todolist({target, initialState, onToggle, onRemove}) {
    const toDo = document.createElement('div');
    target.appendChild(toDo);
    this.state = initialState

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { isLoading, selectedUsername, todos } = this.state;

        if (!selectedUsername) {
            return
        }
        if(!isLoading && selectedUsername && todos.length === 0){
            toDo.innerHTML = 'Todo가 없습니다.';
            return;
        }
        toDo.innerHTML = `
        <ul>
            ${todos.map(({ _id, content, isCompleted }) => `
                <li data-id="${_id}" class="todo-item">
                    ${isCompleted ? `<s>${content}</s>` : content}
                    <button class="remove">X</button>
                </li>
            `).join("")}
        </ul>
        `
    };

    toDo.addEventListener('click', (e) => {
        const li = e.target.closest('.todo-item');
        if (li) {
            const { id } = li.dataset
            const { className } = e.target;
            if (className === 'remove') {
                onRemove(id);
            } else {
                onToggle(id);
            }
        }
    });
    this.render();
}