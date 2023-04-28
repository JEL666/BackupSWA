import Node from "./node.js";
import Requestor from "./api.js";
import ImageViewer from "./imageviewer.js";
import Loading from "./loading.js";
import Breadcrumb from "./breadcrumb.js";

export default class App {
    constructor({ target }) {
        this.target = target;
        this.state = {
            isRoot: true,
            isLoading: false,
            nodes: [],
            paths: []
        };

        this.page = document.createElement('div');
        target.appendChild(this.page);
        
        this.loading = new Loading({ target: this.page });

        this.breadcrumb = new Breadcrumb({
            target: this.page,
            initialState: this.state.paths,
            onClick: (id) => {
                if (id) {
                    const pathIndex = [...this.state.paths].findIndex(path => path.id === id);
                    this.setState({
                        ...this.state,
                        paths: [...this.state.paths].slice(0, pathIndex + 1)
                    })
                } else {
                    this.setState({
                        ...this.state,
                        paths: []
                    })
                }
                this.fetchNodes(id);
            }
        });

        this.node = new Node({
            target: this.page,
            initialState: {
                isRoot: this.state.isRoot,
                nodes: this.state.nodes,
                selectedImageUrl: null
            },
            onClick: async (node) => {
                if (node.type === 'DIRECTORY') {
                    await this.fetchNodes(node.id);
                    
                    this.setState({
                        ...this.state,
                        paths: [...this.state.paths, node]
                    });
                }
                else if (node.type === 'FILE') {
                    this.setState({
                        ...this.state,
                        selectedImageUrl: `https://cat-photos-dev-serverlessdeploymentbucket-fdpz0swy5qxq.s3.ap-northeast-2.amazonaws.com/public${node.filePath}`
                    })
                }
            },
            onPrevClick: async () => {
                const nextPaths = [...this.state.paths];
                nextPaths.pop();
                this.setState({
                    ...this.state,
                    paths: nextPaths
                });

                if(nextPaths.length === 0) {
                    await this.fetchNodes()
                } else {
                    await this.fetchNodes(nextPaths[nextPaths.length - 1].id);
                }
            }
        })

        this.imageViewer = new ImageViewer({
            target: this.page,
            onClose: () => {
                this.setState({
                    ...this.state,
                    selectedImageUrl: null
                })
            }
        });

        this.fetchNodes();
    }

    setState(nextState) {
        this.loading.setState(
            nextState.isLoading
        );
        
        this.breadcrumb.setState(this.state.paths);
        
        
        this.node.setState({
            isRoot: nextState.isRoot,
            nodes: nextState.nodes
        });
        
        this.imageViewer.setState({
            imageUrl: nextState.selectedImageUrl
        });

        this.state = nextState;
    }

    async fetchNodes(id) {
        this.setState({
            ...this.state,
            isLoading: true
        })
        const requestor = new Requestor();
        const nodes = await requestor.request(id ? `/${id}` : ``);

        this.setState({
            ...this.state,
            isRoot: id ? false : true,
            nodes,
            isLoading: false
        })
    }

};
