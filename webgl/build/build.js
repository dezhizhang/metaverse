/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("/*\n * :file description: \n * :name: /webgl/src/index.js\n * :author: 张德志\n * :copyright: (c) 2022, Tungee\n * :date created: 2022-07-10 11:12:55\n * :last editor: 张德志\n * :date last edited: 2022-08-06 21:26:19\n */\n// function main() {\n//     const canvas = document.getElementById('canvas');\n//     const ctx = canvas.getContext('2d');\n//     ctx.fillStyle='rgba(0,0,255,1.0)';\n//     ctx.fillRect(120,10,150,150);\n// }\n// main();\n// function main() {\n//     const canvas = document.getElementById('canvas');\n//     const ctx = canvas.getContext('2d');\n//     ctx.fillStyle = 'rgba(0,0,255,1.0)';\n//     ctx.fillRect(120,10,150,150);\n// }\n// main();\nfunction main() {\n  const canvas = document.getElementById('canvas');\n  const ctx = getWebGLContext(canvas);\n  ctx.clearColor(0.0, 0.0, 0.0, 1.0);\n  ctx.clear(ctx.COLOR_BUFFER_BIT);\n}\n\nmain();\n\n//# sourceURL=webpack://webgl/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;