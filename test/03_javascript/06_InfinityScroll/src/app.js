import PhotoList from "./photolist.js";
import { request } from "./api.js";

export default function App({ target }) {
    const h1 = document.createElement('h1');
    h1.innerText = 'Cat Photos';
    h1.style.textAlign = 'center';
    target.appendChild(h1);
    
    this.state = {
        limit: 5,
        nextStart: 0,
        photos: [],
        isLoading: false,
        totalCount: 0
    };

    const photoListComponent = new PhotoList({
        target,
        initialState: {
            photos: this.state.photos,
            isLoading: this.state.isLoading,
            totalCount: this.state.totalCount
        },
        onScrollEnded: async () => {
            await fetchPhotos();
        }
    });

    this.setState = (nextState) => {
        this.state = nextState;
        photoListComponent.setState({
            photos: nextState.photos,
            isLoading: this.state.isLoading,
            totalCount: nextState.totalCount
        });
    };

    const fetchPhotos = async () => {
        this.setState({
            ...this.state,
            isLoading: true
        })
        const { limit, nextStart } = this.state;
        const photos = await request(`/cat-photos?_limit=${limit}&_start=${nextStart}`);
        this.setState({
            ...this.state,
            nextStart: nextStart + limit,
            photos: this.state.photos.concat(photos),
            isLoading: false
        });
    };

    const initialize = async () => {
        const totalCount = await request(`/cat-photos/count`);
        this.setState({
            ...this.state,
            totalCount
        })
        fetchPhotos();
    }
    initialize();
}

