export default class SearchResults {
    constructor({ target, initialState }) {
        this.pageComponent = document.createElement('div');
        this.pageComponent.className = 'SearchResults';
        target.appendChild(this.pageComponent);
        this.state = initialState;

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        console.log(this.state);
        this.pageComponent.innerHTML = `
            ${this.state.map(result => `
                <div>
                    <img src="${result.url}">
                </div>
            `).join('')}
        `;
    }
}
