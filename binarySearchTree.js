import { Node } from "./nodes.js";

class Tree {
  constructor(arr) {
    const sortedUniqueArray = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedUniqueArray, 0, sortedUniqueArray.length - 1);
  }

  buildTree(arr, startIndex, endIndex) {
    if (startIndex > endIndex) return null;

    const mid = Math.floor((startIndex + endIndex) / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr, startIndex, mid - 1);
    node.right = this.buildTree(arr, mid + 1, endIndex);

    return node;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;
    let parentNode = null;

    while (currentNode !== null) {
      parentNode = currentNode;

      if (value === currentNode.data) {
        return;
      }

      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (value < parentNode.data) {
      parentNode.left = newNode;
    } else {
      parentNode.right = newNode;
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

const idk = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(idk.root);
