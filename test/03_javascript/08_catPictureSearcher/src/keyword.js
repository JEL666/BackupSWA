export default class Keyword {
    constructor({ target, initialState, onKeywordInput, onEnter }) {
        this.pageComponent = document.createElement('input');
        this.pageComponent.className = 'Keyword';
        target.appendChild(this.pageComponent);
        this.state = initialState;

        this.pageComponent.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                onEnter();
            } else {
                onKeywordInput(e.target.value);
            }
        })
    }

    setState(nextState) {
        this.state = nextState;
        this.pageComponent.value = this.state.value;
    }
}