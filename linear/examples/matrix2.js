/*
 * :file description: 
 * :name: /linear/examples/matrix2.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-19 08:26:59
 * :last editor: 张德志
 * :date last edited: 2024-11-19 08:27:00
 */
function determinant2x2(matrix) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

const A = [
    [3,5],
    [2,4]
]

console.log('矩阵 A 的行列式是:',determinant2x2(A));
