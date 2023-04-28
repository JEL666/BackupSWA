import Keyword from './keyword.js';

export default class Header {
    constructor({ target, initialState, onKeywordInput, onEnter }) {
        //main component
        this.pageComponent = document.createElement('header');
        this.pageComponent.className = 'Header';
        target.appendChild(this.pageComponent);
        this.state = initialState;
        //h1
        const h1 = document.createElement('h1');
        h1.innerHTML = '고양이 사진 검색기';
        h1.style.textAlign = 'center';
        this.pageComponent.appendChild(h1);

        this.keyword = new Keyword({
            target: this.pageComponent,
            onKeywordInput,
            initialState: {
                keyword: this.state.keyword
            },
            onEnter
        });
    }

    setState(nextState) {
        this.state = nextState;

        this.keyword.setState({
            value: this.state.keyword
        })
    }

}