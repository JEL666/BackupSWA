export default class Node {
    constructor({ target, initialState, onClick, onPrevClick }) {
        this.pageComponent = document.createElement('div');
        this.pageComponent.classList.add('Nodes');
        target.appendChild(this.pageComponent);

        this.state = initialState;
        this.render();

        this.pageComponent.addEventListener('click', e => {
            const nodeElement = e.target.closest('.Node');

            const { id } = nodeElement.dataset;

            const node = this.state.nodes.find(node => node.id === id);

            if (node) {
                onClick(node)
            } else {
                onPrevClick();
            }
        })

        window.addEventListener('keyup', (e) => {
            console.log(e.key);
            if(e.key === 'Backspace') {
                onPrevClick();
            }
        })
    }

    setState(nextState) {
        if (this.state != nextState) {
            this.state = nextState;
            this.render();
        } 
    }

    render() {
        const { isRoot, nodes } = this.state;

        this.pageComponent.innerHTML = `
            ${isRoot ? '' :
            `<div class="Node">
                <img src="https://cat-photos-dev-serverlessdeploymentbucket-fdpz0swy5qxq.s3.ap-northeast-2.amazonaws.com/public/images/prev.png">
            </div>
            `}
            ${nodes.map(node => `
                <div class="Node" data-id="${node.id}">
                    <img src="${node.type === 'DIRECTORY' ?
                        'https://cat-photos-dev-serverlessdeploymentbucket-fdpz0swy5qxq.s3.ap-northeast-2.amazonaws.com/public/images/directory.png' :
                        'https://cat-photos-dev-serverlessdeploymentbucket-fdpz0swy5qxq.s3.ap-northeast-2.amazonaws.com/public/images/file.png'
                    }">
                    ${node.name}
                </div>
            `).join('')}
        `;
    }
}