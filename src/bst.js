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
            arr[0] === undefined ? this.root = new Node(null) : this.root = new Node(arr[0]);
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
bst.insert(66);
prettyPrint(bst.root);