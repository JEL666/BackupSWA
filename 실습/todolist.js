export default class ToDoList {
    constructor({ target, initialState }) {
        this.liElement = document.createElement('ul');
        target.appendChild(this.liElement);
        this.state = initialState;

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.liElement.innerHTML = `
            <li>테스트</li>
        `;
    }
}