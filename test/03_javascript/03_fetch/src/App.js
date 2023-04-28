import HomePage from "./pages/HomePage.js"
import ProductPage from "./pages/ProductPage.js"

export default function App({ $target }){
    const homepage = new HomePage({ $target })
    const productpage = new ProductPage({ $target, initialState: {}})
    this.route = () => {
        const { pathname } = location

        $target.innerHTML = ''

        if(pathname === '/'){
            homepage.render()
        }
        else if(pathname.indexOf('/products/') > -1){
            const [,,productId] = pathname.split('/')

            productpage.setState({
                productId
            })
        }
        else {
            $target.innerHTML = '<h1>404 Not Founded</h1>'
            
        }
    }

    this.init = () => {
        this.route()
    }

    window.addEventListener('click', e => {
        if(e.target.className === 'link'){
            e.preventDefault()
            const { href } = e.target
            history.pushState(null, null, href.replace(location.origin, ''))
            this.route()
        }
    })

    window.addEventListener('popstate', () => this.route())

    this.init()
}