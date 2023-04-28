export default class Breadcrumb {
    constructor({ target, initialState, onClick }) {
        this.pageComponent = document.createElement('nav');
        this.pageComponent.className = 'Breadcrumb';
        target.appendChild(this.pageComponent);

        this.state = initialState;

        this.pageComponent.addEventListener('click', (e) => {
            const breadcrumbItem = e.target.closest('.Breadcrumb__item');   
            const { id } = breadcrumbItem.dataset;
            onClick(id);
        });
    }

    setState(nextState) {
        if (this.state != nextState) {
            this.state = nextState;
            this.render();
        }   
    }

    render() {
        this.pageComponent.innerHTML = `
            <div class="Breadcrumb__item">Root</div>
            ${this.state.map(({ id, name }) => `
                <div data-id="${id}" class="Breadcrumb__item">${name}</div>
            `).join('')}
        `;
    }
}