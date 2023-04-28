export default function PhotoList({ target, initialState, onScrollEnded }) {
    let isInitialize = false;
    const pageComponent = document.createElement('div');
    target.appendChild(pageComponent);
    this.state = initialState;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.state.isLoading) {
                console.log(entry.target);
                observer.unobserve(entry.target);
                if (this.state.totalCount > this.state.photos.length) {
                    onScrollEnded();
                }
            }
        })
    }, {
        threshold: 1
    })
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };


    this.render = () => {
        if (!isInitialize) {
            pageComponent.innerHTML = `
            <ul class="PhotoList__photos"></ul>
            `;
            isInitialize = true;
        }

        const { photos } = this.state;
        const photoList = pageComponent.querySelector('.PhotoList__photos');

        photos.forEach(photo => {
            if (photoList.querySelector(`li[data-id="${photo.id}"]`) === null) {
                const li = document.createElement('li');
                li.setAttribute('data-id', photo.id);
                li.style = 'list-style: none; min-height: 800px;'
                li.innerHTML = `<img width="100%", src="${photo.imagePath}" />`

                photoList.appendChild(li);
            }
        })
        const lastLi = photoList.querySelector('li:last-child');

        if (lastLi !== null) {
            observer.observe(lastLi);
        }
    };



    this.render();

    // window.addEventListener('scroll', () => {
    //     const { isLoading, totalCount, photos } = this.state;
    //     const isScrollEnded = (window.innerHeight + window.scrollY) + 200 >= document.body.offsetHeight
        
    //     if (isScrollEnded && !this.state.isLoading && photos.length < totalCount) {
    //         onScrollEnded()
    //     }
    // })
}