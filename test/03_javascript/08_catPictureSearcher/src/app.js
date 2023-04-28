import Header from "./header.js";
import { request } from "./api.js";
import { getItem, setItem } from "./storage.js";
import KeywordSuggester from "./keywordsuggester.js";
import SearchResults from "./searchresult.js";
import debounce from "./debounce.js";

export default class App {
    constructor({ target }) {
        this.state = {
            keyword: '',
            keywords: [],
            catImages: []
        };

        this.cache = getItem('keywords_cache', {});

        this.header = new Header({
            target,
            initialState: {
                keyword: this.state.keyword
            },
            onKeywordInput: debounce (
                async (keyword) => {
                    if (keyword.trim().length > 1) {

                        let keywords = null;
                        if (this.cache[keyword]) {
                            keywords = this.cache[keyword];
                        } else {
                            keywords = await request(`/keywords?q=${keyword}`);
                            this.cache[keyword] = keywords
                            setItem('keywords_cache', this.cache);
                        }
                        this.setState({
                            ...this.state,
                            keyword,
                            keywords
                        });
                }
            }, 300),

            onEnter: () => {
                this.fetchCatsImage()
            }
        });

        this.keywordSuggester = new KeywordSuggester({
            target,
            initialState: {
                keywords: this.state.keywords,
                cursor: -1
            },
            onKeywordSelect: (keyword) => {
                this.setState({
                    ...this.state,
                    keyword,
                    keywords: []
                })
                this.fetchCatsImage();
            }
        });

        this.searchResults = new SearchResults({
            target,
            initialState: this.state.catImages
        });
    }

    setState(nextState)  {
        this.state = nextState;
        this.keywordSuggester.setState({
            keywords: this.state.keywords
        });
        if (this.state.keyword !== nextState.keyword) {
            this.header.setState({
                keyword: nextState.keyword
            });
        }
        
        if (this.state.catImages.length > 1) {
            this.searchResults.setState(
                this.state.catImages
            );
        }
    
    }

    async fetchCatsImage() {
        const { data } = await request(`/search?q=${this.state.keyword}`);
        this.setState({
            ...this.state,
            catImages: data,
            keywords: []
        });
    }



}