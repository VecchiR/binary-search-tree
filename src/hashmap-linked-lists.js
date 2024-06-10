export class Node {
    constructor() {
        this.key = null;
        this.value = null;
        this.nextNode = null;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
    }

    append(key, value) {
        const node = new Node();
        node.key = key;
        node.value = value;
        if (this.head === null) { this.head = node; return; }
        let current = this.head;
        while (current.nextNode != null) {
            current = current.nextNode;
        }
        current.nextNode = node;
    }

    prepend(key, value) {
        const node = new Node();
        node.key = key;
        node.value = value;
        node.nextNode = this.head;
        this.head = node;
    }

    size() {
        if (this.head === null) { return 0; }
        let count = 1;
        let current = this.head;
        while (current.nextNode != null) {
            count++;
            current = current.nextNode;
        }
        return count;
    }

    tail() {
        let tail = this.head;
        while (tail.nextNode != null) {
            tail = tail.nextNode;
        }
        return tail;
    }

    at(index) {
        if (index >= this.size() || index < 0) { return 'Index is out of range!' };
        let node = this.head;
        let count = 0;
        while (count != index) {
            count++;
            node = node.nextNode;
        }
        return node;
    }

    pop() {
        if (this.head === null) { return; }
        let node = this.head;
        while (node.nextNode.nextNode != null) {
            node = node.nextNode;
        }
        node.nextNode = null;
    }

    containsKey(key) {
        if (this.head === null) { return false; }
        let node = this.head;
        if (node.key === key) { return true; }
        while (node.nextNode != null) {
            node = node.nextNode;
            if (node.key === key) { return true; }
        }
        return false;
    }

    findKey(key) {
        let index = 0;
        let node = this.head;
        if (node.key === key) { return index; }
        while (node.nextNode != null) {
            node = node.nextNode;
            index++;
            if (node.key === key) { return index; }
        }
        return null;
    }

    toString() {
        if (this.head === null) { return null; }
        let string = '';
        let node = this.head;
        while (node.nextNode != null) {
            string = string + `(${node.value}) -> `;
            node = node.nextNode;
        }
        string = string + `(${node.value}) -> null`;
        return string;
    }

    insertAt(value, index) {
        if (index > this.size() || index < 0) { return 'Index is out of range!'; }
        if (index === this.size()) { return this.append(value); }
        let node = this.head;
        let count = 0;
        while (count < index) {
            count++;
            node = node.nextNode;
        }
        let temp = {
            value: node.value,
            nextNode: node.nextNode,
        };
        node.value = value;
        node.nextNode = temp;
    }

    removeAt(index) {
        if (index === null || index < 0 || index >= this.size()) { return 'Index is out of range!'; }
        if (index === 0) {
            this.head = this.head.nextNode;
            return;
        }
        let currentNode = this.head;
        let count = 0;
        while (count +1 < index) {
            count++;
            currentNode = currentNode.nextNode;
        }
        try {
            currentNode.nextNode = currentNode.nextNode.nextNode;
        } catch {
            currentNode.nextNode = null;
        }
    }

}
