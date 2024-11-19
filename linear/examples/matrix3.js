/*
 * :file description:
 * :name: /linear/examples/matrix3.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-19 08:44:03
 * :last editor: 张德志
 * :date last edited: 2024-11-19 08:44:04
 */

function determinant(matrix) {
  const n = matrix.length;

  // 基础情况：1x1 矩阵
  if (n === 1) {
    return matrix[0][0];
  }

  // 基础情况：2x2 矩阵
  if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  // 递归展开计算
  let det = 0;
  for (let col = 0; col < n; col++) {
    const subMatrix = matrix
      .slice(1)
      .map((row) => row.filter((_, j) => j !== col));
    det += matrix[0][col] * determinant(subMatrix) * (col % 2 === 0 ? 1 : -1);
  }

  return det;
}

const B = [
  [2, 1, 3],
  [0, 4, 5],
  [1, 0, 6],
];

console.log("矩阵 B 的行列式是:", determinant(B)); // 输出: 39
