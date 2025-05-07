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

  deleteItem(value) {
    if (this.root === null) {
      return false;
    }

    let currentNode = this.root;
    let parentNode = null;
    let isLeftChild = false;

    while (currentNode !== null && currentNode.data !== value) {
      parentNode = currentNode;

      if (value < currentNode.data) {
        isLeftChild = true;
        currentNode = currentNode.left;
      } else {
        isLeftChild = false;
        currentNode = currentNode.right;
      }
    }

    if (currentNode === null) {
      return false;
    }

    //Case 1
    if (parentNode.left === null && parentNode.right === null) {
      if (currentNode === this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    }
    //Case 2
    else if (currentNode.right === null) {
      if (currentNode === this.root) {
        this.root = currentNode.left;
      } else if (isLeftChild) {
        parentNode.left = currentNode.left;
      } else {
        parentNode.right = currentNode.left;
      }
    } else if (currentNode.left === null) {
      if (currentNode === this.root) {
        this.root = currentNode.right;
      } else if (isLeftChild) {
        parentNode.left = currentNode.right;
      } else {
        parentNode.right = currentNode.right;
      }
    }
    //Case 3
    else {
      let successorParent = currentNode;
      let successor = currentNode.right;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      currentNode.data = successor.data;

      if (successorParent === currentNode) {
        currentNode.right = successor.right;
      } else {
        successorParent.left = successor.right;
      }
    }
    return true;
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (value === currentNode.data) {
        return currentNode;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required for traversal.");
    }

    let queue = [];
    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length !== 0) {
      let currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required for traversal.");
    }

    this.#inOrderRec(this.root, callback);
  }

  #inOrderRec(node, callback) {
    if (node === null) {
      return;
    }
    this.#inOrderRec(node.left, callback);
    callback(node);
    this.#inOrderRec(node.right, callback);
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required for traversal.");
    }

    this.#preOrderRec(this.root, callback);
  }

  #preOrderRec(node, callback) {
    if (node === null) {
      return;
    }
    callback(node);
    this.#inOrderRec(node.left, callback);
    this.#inOrderRec(node.right, callback);
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required for traversal.");
    }

    this.#postOrderRec(this.root, callback);
  }

  #postOrderRec(node, callback) {
    if (node === null) {
      return;
    }
    this.#inOrderRec(node.left, callback);
    this.#inOrderRec(node.right, callback);
    callback(node);
  }

  height(value) {
    const node = this.find(value);
    if (node === null) {
      return null;
    }

    return this.#calculateHeight(node);
  }

  #calculateHeight(node) {
    if (node === null) {
      return -1;
    }

    return 1 + Math.max(this.#calculateHeight(node.left), this.#calculateHeight(node.right));
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
