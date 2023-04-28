export default class ImageViewer {
    constructor({ target, onClose }) {
        this.pageComponent = document.createElement('div');
        this.pageComponent.className = 'ImageViewer Modal';
        target.appendChild(this.pageComponent);

        this.state = {
            imageUrl: null
        };

        this.render();

        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        });

        this.pageComponent.addEventListener('click', (e) => {
            if (Array.from(e.target.classList).includes('Modal')) {
                onClose();
            }
        });
    }

    setState(nextState) {
        if (this.state != nextState) {
            this.state = nextState;
            this.render();
        } 
    }

    render() {
        this.pageComponent.style.display = this.state.imageUrl ? 'block' : 'none';

        this.pageComponent.innerHTML = `
            <div class="content">
                <img src="${this.state.imageUrl}">
            </div>
        `;
    }
}