class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if(this.root === null){
            this.root = newNode;
            return;
        }

        let currentNode = this.root;
        while(currentNode !== null){
            if(currentNode.value < value) {
                if(currentNode.right === null){
                    currentNode.right = newNode;
                    break;
                }
                currentNode = currentNode.right;
            }
            else {
                if(currentNode.left === null){
                    currentNode.left = newNode;
                    break;
                }
                currentNode = currentNode.left;
            }
        }
    }

    search(value){
        let currentNode = this.root;
        while(currentNode !== null){
            if(currentNode.value === value){
                return currentNode;
            }
            if(currentNode.value < value){
                currentNode = currentNode.right;
            }
            else {
                currentNode = currentNode.left;
            }
            
        }
        return null;
    }
    getParentNode(value){
        let currentNode = this.root;
        let parentNode = null;
        while(currentNode !== null){
            if(currentNode.value === value){
                return parentNode;
            }
            if(currentNode.value < value){
                parentNode = currentNode;
                currentNode = currentNode.right;
            }
            else {
                parentNode = currentNode;
                currentNode = currentNode.left;
            }
            
        }
        return null;
    }
    preorder_display(node = this.root){
        process.stdout.write(node.value + " ");
        if(node.left != null){
            this.preorder_display(node.left);
        }
        if(node.right != null){
            this.preorder_display(node.right);
        }
    }
    
    delete(value){
        this.search
    }
}
const bst = new BinarySearchTree();
let arr = [5, 4, 6, 3, 2, 1, 0, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
for(const i of arr){
    bst.insert(i);
}

bst.preorder_display();