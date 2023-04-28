import Editor from "./editor.js";
import { setItem, getItem, removeItem } from "./storage.js";
import { request } from "./request.js";
import linkButton from "./linkbutton.js";

export default function PostEditPage({ target, initialState }) {
    this.state = initialState;


    const page = document.createElement('div');
    

    let postLocalSaveKey = `temp-post-${this.state.postId}`;

    const post = getItem(postLocalSaveKey, {
        title: '',
        content: ''
    });
    
    this.render = () => {
        target.appendChild(page);
    };
    this.render();


    let timer = null;

    const editor = new Editor({
        target: page,
        initialState: post,
        onEditing: (post) => {
            console.log(post)
            clearTimeout(timer);
            timer = setTimeout(async() => {
                setItem(postLocalSaveKey, {
                    ...post,
                    tempSaveData: new Date()
                });

                const isNew = this.state.postId === 'new';
                if (isNew) {
                    const createdPost = await request('/posts', {
                        method: 'POST',
                        body: JSON.stringify(post)
                    });
                    history.replaceState(null, null, `/posts/${createdPost.id}`);
                    removeItem(postLocalSaveKey);

                    this.setState({
                        postId: createdPost.id
                    });
                } else {
                    await request(`/posts/${post.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(post)
                    })
                    removeItem(postLocalSaveKey)
                }
            }, 2000);
        }
    });

    this.setState = async nextState => {
        if (this.state.postId !== nextState.postId) {
            postLocalSaveKey = `temp-post-${nextState.postId}`;
            this.state = nextState;
            if (nextState.postId === 'new') {
                const post = getItem(postLocalSaveKey, {
                    title: '',
                    content: ''
                });
                editor.setState(post);
                this.render();
            } else {
                await fetchPost(); 
            }
            return;
        }
        this.state = nextState;
        
        editor.setState(this.state.post || {
            title: '',
            content: ''
        })
        this.render();
    }
    const fetchPost = async () => {
        const { postId } = this.state;
        if (postId !== 'new') {
            const post = await request(`/posts/${postId}`);

            const tempPost = getItem(postLocalSaveKey, {
                title: '',
                content: ''
            });
            
            if (tempPost.tempSaveData && tempPost.tempSaveData > post.updated_at) {
                if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
                    this.setState({
                        ...this.state,
                        post: tempPost
                    });
                    return;
                }
            }
            this.setState({
                ...this.state,
                post
            });
        }
    }

    new linkButton({
        target: page,
        initialState: {
            text: '목록으로',
            url: '/'
        }
        
    })
}