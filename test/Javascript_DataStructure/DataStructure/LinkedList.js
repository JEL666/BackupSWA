class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }


}

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    find(value) {
        let cur_node = this.head;
        while(cur_node.value !== value){
            if(cur_node.next === null)
                return null;
            else
                cur_node = cur_node.next;
        }
        return cur_node;
    }

    append(value) {
        const newNode = new Node(value);
        if(this.head === null){
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            const prevNode = this.tail;
            prevNode.next = newNode;
            newNode.prev = prevNode;
            this.tail = newNode;
        }
        this.length++;
        return newNode;
    }

    insertNext(node, value) {
        const newNode = new Node(value);
        if(node === this.tail){
            this.tail = newNode;
        }
        else {
            (node.next).prev = newNode; // if node == this.tail
            newNode.next = node.next;
        }
        newNode.prev = node;
        node.next = newNode;
        this.length++;
        return newNode;
    }

    insertPrev(node, value){
        const newNode = new Node(value);
        if(node === this.head){
            this.head = newNode;
        }
        else {
            (node.prev).next = newNode; // if node == this.tail
            newNode.prev = node.prev;
        }
        newNode.next = node;
        node.prev = newNode;
        this.length++;
        return newNode;
    }

    remove(value){
        const curNode = this.find(value);
        if(curNode === this.head && curNode === this.tail){
            this.head = null;
            this.tail = null;
        }
        else{
            if(curNode !== this.head){
                curNode.prev.next = curNode.next
                if(curNode === this.tail)
                    this.tail = curNode.prev;
            }
            if(curNode !== this.tail){
                curNode.next.prev = curNode.prev
                if(curNode === this.head)
                    this.head = curNode.next;
            }
        }
        this.length--;
        return curNode;
    }

    display(){
        let curNode = this.head;
        let str = "[";
        if(curNode === null){
            console.log("[]");
            return
        }
        while(curNode.next != null){
            str += (curNode.value + ", ");
            curNode = curNode.next;
        }
        str += curNode.value+"]";
        console.log(str);
    }

    display_reverse(){
        let curNode = this.tail;
        let str = "[";
        if(curNode === null){
            console.log("[]");
            return
        }
        while(curNode.prev != null){
            str += (curNode.value + ", ");
            curNode = curNode.prev;
        }
        str += curNode.value+"]";
        console.log(str);
    }
}

console.log("test");
let dl = new DoubleLinkedList();

dl.display();
for(let i = 0; i<10; i++){
    dl.append(i);
}
dl.display();
dl.display_reverse();
console.log(dl.length);
console.log(dl.find(5));
console.log(dl.remove(7));
dl.remove(8);
dl.display();
dl.display_reverse();
dl.insertNext(dl.find(6), 7);
dl.insertPrev(dl.find(9), 8);
dl.display();
dl.display_reverse();