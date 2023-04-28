class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor(node){
        this.root = node;
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

    inorder_display(node = this.root){
        
        if(node.left != null)
            this.inorder_display(node.left);
        process.stdout.write(node.value + " ");
        if(node.right != null)
            this.inorder_display(node.right);
    }

    postorder_display(node = this.root){
        if(node.left != null)
            this.postorder_display(node.left);
        if(node.right != null)
            this.postorder_display(node.right);
        process.stdout.write(node.value + " ");
    }
}

let root = new Node(9);
root.left = new Node(8);
root.right = new Node(7);
root.left.left = new Node(6);
root.left.right = new Node(5);
root.right.left = new Node(4);
root.right.right = new Node(3);
root.left.left.left = new Node(2);
root.left.right.right = new Node(1);
root.right.right.right = new Node(0);

const bt = new BinaryTree(root);
bt.postorder_display();