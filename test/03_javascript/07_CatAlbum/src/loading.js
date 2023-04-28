export default class Loading {
    constructor({ target }) {
        this.pageComponent = document.createElement('div');
        this.pageComponent.className = 'Loading Modal';
        target.appendChild(this.pageComponent);
        this.state = false;
    }

    setState(nextState) {
        if (this.state != nextState) {
            this.state = nextState;
            this.render();
        } 
    }

    render() {
        this.pageComponent.style.display = this.state ? 'block' : 'none';

        this.pageComponent.innerHTML = `
            <div class="content">
                <img src="https://www.nyan.cat/cats/original.gif" alt="Loading...">
            </div>
        `;
    }
}