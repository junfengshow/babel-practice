
module.exports = function ({ types: t }) {
  return {
    visitor: {
      ExpressionStatement(path) {
        if (path.node.expression.callee.object.name === 'console') {
          path.remove();
        }
      },
    }
  };
};
