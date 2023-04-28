class MinHeap {
    constructor(){
        this.heap = [];
    }

    push(value){
        let myNode_index = this.heap.length;
        this.heap.push(value);
        let parentNode_index = this.getParentNodeIndex(myNode_index);
        
        while(myNode_index != 0 && this.heap[parentNode_index] > value){
            let temp = this.heap[parentNode_index];
            this.heap[parentNode_index] = value;
            this.heap[myNode_index] = temp;
            myNode_index = parentNode_index;
            parentNode_index = this.getParentNodeIndex(myNode_index);
        }
    }
    
    getParentNodeIndex(num){
        return Math.floor((num-1)/2);
    }

    preorder_display(index = 0){
        process.stdout.write(this.heap[index] + " ");
        if(index*2+1 < this.heap.length){
            this.preorder_display(index*2+1);
        }
        if(index*2+2 < this.heap.length){
            this.preorder_display(index*2+2);
        }
    }

    pop(){
        const returnValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        let myNode_index = 0;
        let leftchild_index = 1;
        let rightchild_index = 2;
        while(
            this.heap[myNode_index] > this.heap[leftchild_index] ||
            this.heap[myNode_index] > this.heap[rightchild_index]
            ){
            if(this.heap[leftchild_index] < this.heap[rightchild_index]){
                const temp = this.heap[myNode_index];
                this.heap[myNode_index] = this.heap[leftchild_index];
                this.heap[leftchild_index] = temp;
                myNode_index = leftchild_index;
            }
            else{
                const temp = this.heap[myNode_index];
                this.heap[myNode_index] = this.heap[rightchild_index];
                this.heap[rightchild_index] = temp;
                myNode_index = rightchild_index;
            }
            leftchild_index = myNode_index * 2 + 1;
            rightchild_index = myNode_index * 2 + 2;
        }
        return returnValue;
    }
}

const mh = new MinHeap();

for(let i = 8; i > 0; i--){
    mh.push(i);
}
mh.pop();
mh.pop();


console.log(mh.heap);
mh.preorder_display();