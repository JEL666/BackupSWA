// Queue가 아니라 잘못 구현됨

class Node {
    constructor(value, loc){
        this.value = value;
        this.next = null;
        this.loc = loc;
    }
}

class Queue{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.highest = null;
    }

    enqueue(value, loc){
        const newNode = new Node(value, loc);
        if(this.size == 0){
            this.head = newNode;
            this.tail = newNode;
            this.highest = value;
        }
        else{
            this.tail.next = newNode;
            this.tail = newNode;
            if(this.highest < value)
                this.highest = value;
        }
        this.size++;
        return newNode;
    }

    dequeue(value){
        if(this.tail == null)
            return null;
        else{
            let deqNode = this.head;
            while(value != deqNode.value){
                this.tail.next = deqNode;
                this.tail = deqNode;
                this.head = deqNode.next;
                deqNode = this.head;
            }
            
            this.head = this.head.next;
            this.size--;
            return deqNode;
        }
    }

    peek(){
        return this.head.value;
    }
    
    getSize(){
        return this.size;
    }

    display(){
        let curNode = this.head;
        let str = "";
        if(this.size == 0){
            return null;
        }
        while(curNode !== this.tail){
            str += curNode.value + ", ";
            curNode = curNode.next;
        }
        str += curNode.value;
        console.log(str);
        return;
    }
    
    setHighest(){
        let highest = 1;
        let curNode = this.head;
        if(this.size == 0){
            return null;
        }
        for(let i = 0; i < this.size; i++){
            if (highest < curNode.value){
                highest = curNode.value;
            }
            curNode = curNode.next;
        }
        this.highest = highest;
        return;
    }
}
function solution(priorities, location) {
    var answer = 0;
    let pri_queue = new Queue();
    for(const i in priorities){
        pri_queue.enqueue(priorities[i], i);
    }
    l = -1;
    console.log(pri_queue.highest);
    while(location != l){
        l = pri_queue.dequeue(pri_queue.highest).loc;
        console.log(pri_queue.highest);
        pri_queue.display();
        pri_queue.setHighest();
        answer++;
    }
    return answer;
}