import { mergeSort as sort } from "./mergesort.js";
import { removeDuplicatesFromSortedArray as deduplicate } from "./deduplicateSortedArray.js";

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
        let current = this.root;
        let previous;

        while (current != null) {

            //NODE WAS FOUND
            if (value === current.data) {

                // NODE IS CHILDRENLESS 
                if (current.left === null && current.right === null) {

                    // NODE IS THE ROOT
                    if (current.data === this.root.data) {
                        return this.root = null;
                    }

                    // NODE IS CHILDRENLESS && IS NOT THE ROOT NODE
                    else {
                        return value > previous.data ?
                            previous.right = null :
                            previous.left = null;
                    }
                }

                // NODE HAS CHILDREN
                else {

                    // NODE HAS 1 CHILD
                    if (current.left != null ^ current.right != null) {
                        if (value > previous.data) {
                            return previous.right =
                                current.left != null ? current.left : current.right;
                        }
                        else if (value < previous.data) {
                            return previous.left =
                                current.left != null ? current.left : current.right;
                        }
                    }

                    // NODE HAS 2 CHILDREN
                    else if (current.left != null && current.right != null) {
                        // go to right node
                        previous = current;
                        current = current.right;

                        // if right node HAS 0 OR 1 child, node anterior vira child node
                        if ((current.left != null && current.right === null) ||
                            (current.left === null && current.right != null)) {
                            return previous = current.left === null ?
                                current.right : current.left; 
                            }

                        // if right node 2 CHILDREN -> go to the left untill node.left é null
                        if (current.left != null && current.right != null) {
                            while (current.left != null) {
                                current = current.left;
                            }
                            previous = current;
                            if (current.right != null) {
                                
                            }


                            //TEM RIGHT -> anterio aponta o left p/ right dele
                        }
                    }
                }
            }


            // NODE WAS NOT FOUND
            else {
                previous = current;
                current = value < current.data ?
                    current.left : // VALUE IS SMALLER THAN CURRENT VALUE
                    current.right; // VALUE IS BIGGER THAN CURRENT VALUE
            }
        }
    }


}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};



const bst = new Tree();
bst.buildTree([2, 4, 6, 8]);
bst.insert(3);
bst.insert(1);
bst.insert(1);
bst.insert(14);
bst.insert(13);
bst.insert(12);
bst.insert(11);
bst.insert(66);
prettyPrint(bst.root);
bst.deleteItem(6);
prettyPrint(bst.root);
bst.deleteItem(1);
prettyPrint(bst.root);
bst.deleteItem(8);
prettyPrint(bst.root);