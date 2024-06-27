import { mergeSort as sort } from "./mergesort.js";
import { removeDuplicatesFromSortedArray as deduplicate } from "./deduplicateSortedArray.js";
import { prettyPrint } from "./prettyPrint.js";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(arr, ready) {
        if (!ready) {
            arr = sort(arr);
            arr = deduplicate(arr);
        }

        if (arr.length < 2) {
            arr[0] === undefined ? this.root = null : this.root = new Node(arr[0]);
            return this.root;
        }
        let middleElementIndex = Math.floor((arr.length - 1) / 2);
        let middleElement = arr[middleElementIndex];
        let left = arr.slice(0, middleElementIndex);
        let right = arr.slice(middleElementIndex + 1);

        this.root = new Node(middleElement);
        let newLeftTree = new Tree();
        let newRightTree = new Tree();
        this.root.left = newLeftTree.buildTree(left, true);
        this.root.right = newRightTree.buildTree(right, true);

        return this.root;

    }

    insert(value) {
        let current = this.root;
        while (current != null) {
            if (value === current.data) { return false; }
            else if (value < current.data) {
                if (current.left === null) {
                    return current.left = new Node(value);
                } else { current = current.left; }
            }
            else {
                if (current.right === null) {
                    return current.right = new Node(value);
                } else { current = current.right; }
            }
        }
    }

    deleteItem(value) {
        let target = this.root;
        let targetParent;

        while (target != null) {

            //TARGET WAS FOUND
            if (value === target.data) {

                // TARGET IS CHILDRENLESS 
                if (target.left === null && target.right === null) {

                    // TARGET IS THE ROOT
                    if (target.data === this.root.data) {
                        return this.root = null;
                    }

                    // TARGET IS CHILDRENLESS && IS NOT THE ROOT NODE
                    else {
                        return value > targetParent.data ?
                            targetParent.right = null :
                            targetParent.left = null;
                    }
                }

                // TARGET HAS CHILDREN
                else {

                    // TARGET HAS 1 CHILD
                    if (target.left != null ^ target.right != null) {
                        if (value === this.root.data) {
                            return this.root =
                                target.left != null ? target.left : target.right;
                        }
                        else if (value > targetParent.data) {
                            return targetParent.right =
                                target.left != null ? target.left : target.right;
                        }
                        else if (value < targetParent.data) {
                            return targetParent.left =
                                target.left != null ? target.left : target.right;
                        }
                    }



                    // TARGET HAS 2 CHILDREN
                    else if (target.left != null && target.right != null) {
                        // go to the leftmost node of the right side of the target
                        let leftmost = target.right;
                        let leftmostParent = 'root';
                        while (leftmost.left != null) {
                            leftmostParent = leftmost;
                            leftmost = leftmost.left;
                        }

                        // SE O LEFTMOST TEM RIGHT CHILD -> daí leftmost's parent.left aponta pra letfmost.right
                        if (leftmost.right != null) {
                            if (leftmostParent === 'root') {
                                target.right = leftmost.right;
                            }
                            else { leftmostParent.left = leftmost.right; }


                        } else {
                            if (leftmostParent === 'root') {
                                target.right = null;
                            }
                            else {
                                leftmostParent.left = null;

                            }
                        }

                        // passa o leftmost pro lugar do target
                        target.data = leftmost.data;
                        return;
                    }
                }
            }


            // TARGET WAS NOT FOUND
            else {
                targetParent = target;
                target = value < target.data ?
                    target.left : // VALUE IS SMALLER THAN CURRENT VALUE
                    target.right; // VALUE IS BIGGER THAN CURRENT VALUE
            }
        }

    }

    find(value) {
        let current = this.root;
        while (current != null) {
            if (value === current.data) { return current; }
            else if (value < current.data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        return console.log('Node not found');
    }

    levelOrder(callback) {
        let queue = [this.root];
        let result = [];


        while (queue.length > 0) {
            if (callback) {
                callback(queue[0].data);
            } else { result.push(queue[0].data); }
            if (queue[0].left != null) { queue.push(queue[0].left); }
            if (queue[0].right != null) { queue.push(queue[0].right); }
            queue.shift();
        }

        return callback ? "Callback finished running!" : result;
    }

    inOrder(callback = false, node = this.root, result = []) {
        if (!node) { return; }

        this.inOrder(callback, node.left, result);

        if (callback) { callback(node.data); }
        else { result.push(node.data); }

        this.inOrder(callback, node.right, result);

        return callback ? "Callback finished running!" : result;
    }

    preOrder(callback = false, node = this.root, result = []) {
        if (!node) { return; }

        if (callback) { callback(node.data); }
        else { result.push(node.data); }
        this.preOrder(callback, node.left, result);
        this.preOrder(callback, node.right, result);
        return callback ? "Callback finished running!" : result;
    }

    postOrder(callback = false, node = this.root, result = []) {
        if (!node) { return; }

        this.postOrder(callback, node.left, result);
        this.postOrder(callback, node.right, result);
        if (callback) { callback(node.data); }
        else { result.push(node.data); }
        return callback ? "Callback finished running!" : result;
    }

    height(node = this.root) {
        if (node === null) { return -1; }
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node = this.root, current = this.root) {
        if (current === null) { return Infinity; }
        if (node.data === current.data) { return 0; }
        let leftDepth = this.depth(node, current.left);
        let rightDepth = this.depth(node, current.right);
        return Math.min(leftDepth, rightDepth) + 1;
    }

    isBalanced(current = this.root) {
        if (current === null) { return 0; }
        let leftside = this.height(current.left);
        let rightside = this.height(current.right);
        return Math.abs(leftside - rightside) <= 1 ? true : false;

    }

    rebalance() {
        let arr = this.inOrder();
        this.buildTree(arr);
        return this.root;
    }
}

function testScript() {
    const bst = new Tree();
    bst.buildTree(generate());
    prettyPrint(bst.root);
    console.log("Balanced?", bst.isBalanced());
    console.log("Level:", bst.levelOrder());
    console.log("In order:", bst.inOrder());
    console.log("pre order:", bst.preOrder());
    console.log("post order:", bst.postOrder());
    bst.insert(122);
    bst.insert(789);
    bst.insert(132);
    bst.insert(135);
    bst.insert(244);
    bst.insert(999);
    prettyPrint(bst.root);
    console.log("Balanced?", bst.isBalanced());
    bst.rebalance();
    prettyPrint(bst.root);
    console.log("Balanced?", bst.isBalanced());
    console.log("Level:", bst.levelOrder());
    console.log("In order:", bst.inOrder());
    console.log("pre order:", bst.preOrder());
    console.log("post order:", bst.postOrder());
}

function testCallback(data) {
    console.log(data);
}

function generate() {
    let numberOfNumbers = Math.floor((Math.random()) * 100) % 25 + 1;
    let arrayOfNumbers = [];
    let randomNumber;
    let i = 0;
    while (i < numberOfNumbers) {
        randomNumber = Math.floor((Math.random()) * 100) + 1;
        arrayOfNumbers.push(randomNumber);
        i++;
    }
    return arrayOfNumbers;
}


testScript();