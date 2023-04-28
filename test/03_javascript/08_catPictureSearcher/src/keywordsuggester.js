export default class KeywordSuggester {
    constructor({ target, initialState, onKeywordSelect }) {
        this.pageComponenet = document.createElement('div');
        this.pageComponenet.className = 'Keywords';
        target.appendChild(this.pageComponenet);
        this.state = initialState;
        this.#render();

        this.pageComponenet.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (li) {
                onKeywordSelect(li.textContent);
            }
        })

        window.addEventListener('keydown', (e) => {
            if (this.pageComponenet.style.display !== 'none') {
                switch (e.key) {
                    case 'ArrowUp':
                        this.setState({
                            ...this.state,
                            cursor: this.state.cursor - 1 < 0 ? this.state.keywords.length - 1 : this.state.cursor - 1
                        });
                        break;
                    case 'ArrowDown':
                        this.setState({
                            ...this.state,
                            cursor: this.state.cursor + 1 > this.state.keywords.length - 1 ? 0 : this.state.cursor + 1
                        });
                        break;
                    case 'Enter':
                        onKeywordSelect(this.state.keywords[this.state.cursor]);
                        break;
                }
                
            }
        })
    }

    setState(nextState) {
        this.state = { ...this.state, ...nextState };
        this.#render();
    }

    #render() {
        const { keywords, cursor } = this.state;
        this.pageComponenet.innerHTML = `
            <ul>
                ${keywords.map((keyword, i) => `
                    <li class="${cursor === i ? 'active' : ''}">${keyword}</li>
                `).join('')}
            </ul>
        `;

        this.pageComponenet.style.display = keywords.length > 0 ? 'block' : 'none';
    }
}