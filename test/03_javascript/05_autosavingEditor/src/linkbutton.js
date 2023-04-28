import { push } from "./router.js";

export default function linkButton({
    target,
    initialState
}) {
    const button = document.createElement('button');
    this.state = initialState;
    target.appendChild(button);

    this.render = () => {
        button.textContent = this.state.text;
    }

    this.render()

    button.addEventListener('click', (e) => {
        push(this.state.url);
    });
}