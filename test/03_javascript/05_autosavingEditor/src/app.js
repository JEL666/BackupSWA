import PostsPage from "./postspage.js"
import PostEditPage from "./posteditpage.js";
import { initRouter } from "./router.js";

export default function app({ target }) {
    const postsPage = new PostsPage({
        target
    });
    const postEditPage = new PostEditPage({
        target,
        initialState: {
            postId: 'new',
            post: {
                title: '',
                content: ''
            }
    }});

    this.route = () => {
        target.innerHTML = '';
        const { pathname } = window.location;

        if (pathname === '/') {
            postsPage.setState();
        } else if (pathname.indexOf('/posts/') === 0) {
            const [, , postId] = pathname.split('/');
            postEditPage.setState({ postId });
        }
    };
    this.route();

    initRouter(() => this.route());
}