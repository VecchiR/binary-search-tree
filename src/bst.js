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
// bst.buildTree([2, 4, 6, 8, 11, 12, 13 ,15 ,16 ,18, 77]);
bst.insert(3);
bst.insert(1);
bst.insert(1);
bst.insert(14);
bst.insert(13);
bst.insert(12);
bst.insert(11);
bst.insert(66);
bst.insert(7);
bst.insert(9);
bst.insert(10);
prettyPrint(bst.root);
bst.find(2);
prettyPrint(bst.root);


function test(x) {
    bst.deleteItem(x);
    prettyPrint(bst.root);
}