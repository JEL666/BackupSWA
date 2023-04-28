import ProductOptions from "../productOptions.js"
import { request } from "../api.js"
import Cart from "../Cart.js"

export default function ProductPage({ $target, initialState }) {
    const $product = document.createElement('div')

    this.state = initialState

    const productOptions = new ProductOptions({
        $target: $product,
        initialState: [],
        onSelect: (option) => {
            const nextState = {...this.state}
            const { selectedOptions } = nextState

            const selectedOptionIndex = selectedOptions.findIndex(selectedOption => selectedOption.optionId === option.optionId)

            if(selectedOptionIndex > -1){
                nextState.selectedOptions[selectedOptionIndex].ea++
            }
            else {
                nextState.selectedOptions.push({
                    optionId: option.optionId,
                    optionName: option.optionName,
                    optionPrice: option.optionPrice,
                    ea: 1
                })
            }
            this.setState(nextState) 
        }
    })

    const cart = new Cart({
        $target: $product,
        initialState: {
            productName: '',
            basePrice: 0,
            selectedOptions: []
        },
        onRemove: (selectedOptionIndex) => {
            const nextState = {...this.state}
            nextState.selectedOptions.splice(selectedOptionIndex, 1)

            this.setState(nextState)
        }
    })
    this.setState = nextState => {
        if(nextState.productId !== this.state.productId){
            fetchOptionData(nextState.productId)
            return
        }
        this.state = nextState
        const { product, selectedOptions, optionData } = this.state
        productOptions.setState(optionData)
        cart.setState({
            productName: product.name,
            basePrice: product.basePrice,
            selectedOptions: selectedOptions
        })
        // this.state = nextState
        this.render()
    }

    this.render = () => {
        $target.appendChild($product)
    }


    const fetchOptionData = (id) => {
        return request(`/products/${id}`)
            .then(product => {
                this.setState({
                    ...this.state,
                    product,
                    optionData: [],
                    selectedOptions: []
                })
                return request(`/product-options?product.id=${product.id}`)
            })
            .then(productOptions => {
                return Promise.all([
                    Promise.resolve(productOptions),
                    Promise.all(
                        productOptions.map(productOption => productOption.id).map(id => {
                            return request(`/product-option-stocks?productOption.id=${id}`)
                        })
                    )
                ])
            })
            .then(data => {
                
                const [productOptions, stocks] = data
                const optionData = productOptions.map(productOptions => {
                    const stock = stocks
                                    .flatMap(data => data)
                                    .find(stock => stock.id === productOptions.id)
                    //console.log(productOptions)
                    return {
                        optionId: productOptions.id,
                        optionName: productOptions.optionName,
                        optionPrice: productOptions.optionPrice,
                        stock: stock.stock
                    }
                })
                this.setState({
                    ...this.state,
                    optionData
                })
            })
            .catch((err) => 
                console.log(err)
            )
    }
    
}