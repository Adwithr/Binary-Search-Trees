import { Tree, prettyPrint } from "./binarySearchTree.js";

const tree = new Tree(createRandomNumbersArray(15));
// console.log(tree.isBalanced());
// tree.preOrder(print);
// tree.postOrder(print);
// tree.inOrder(print);
tree.insert(120);
tree.insert(215);
tree.insert(144);
tree.insert(422);
tree.insert(176);
tree.insert(291);
tree.insert(532);
tree.insert(124);
tree.insert(322);
tree.insert(226);
tree.insert(361);
tree.insert(224);
tree.insert(371);
// console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
prettyPrint(tree.root);
// tree.preOrder(print);
// tree.postOrder(print);
// tree.inOrder(print);

function createRandomNumbersArray(count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100));
  }
  return randomNumbers;
}

function print(data) {
  console.log(data);
}
