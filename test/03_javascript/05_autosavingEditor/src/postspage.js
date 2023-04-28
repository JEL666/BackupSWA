import { request } from "./request.js";
import PostList from "./postlist.js"
import linkButton from "./linkbutton.js";

export default function PostsPage({
    target
}) {
    const page = document.createElement('div')

    const postList = new PostList({
        target: page,
        initialState: []
    });
    
    new linkButton({
        target: page,
        initialState: {
            text: 'New Post',
            url: '/posts/new'
        }
    })

    this.setState = async () => {
        const posts = await request('/posts');
        postList.setState(posts)
        this.render();
    };

    const fetchPosts = async () => {
        const posts = await request('/posts');
        
        postList.setState(posts);
    };
    
    
    this.render = async () => {
        await fetchPosts();
        target.appendChild(page);
    };

}