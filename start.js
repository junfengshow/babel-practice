const babelParser = require('@babel/parser');
const traverse = require("@babel/traverse").default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const path = require('path');

const code = `
  console.log('hello world');
`;
// function getName () {}

// 转换
const ast = babelParser.parse(code, {
  sourceType: "module",
  plugins: [
    'jsx'
  ],
});

// 遍历
traverse(ast, {
  enter(path) {
    
    if (t.isStringLiteral(path.node, {
      value: 'hello world'
    })) {
      path.replaceWith(t.stringLiteral("hello"));
      console.log(t.stringLiteral("hello"))
    }
    // if (path.node.type === 'StringLiteral') {
    //   // console.log('path', path.node);
    //   // path.node.extra.raw = path.node.extra.raw.replaceAll("'", '"');
    //   // path.node.value = '"' + path.node.value + '"';
    //   path.replaceWith(t.stringLiteral("hello"));
    //   console.log(t.stringLiteral("hello"))
    // }
    if (
      path.node.type === "Identifier" &&
      path.node.name === "n"
    ) {
      path.node.name = "x";
    }
  },
  Function (innerPath) {
    // console.log('innerPath', innerPath);
  }
});

console.log('=========:结果:=========')
console.log(generator(ast).code)
