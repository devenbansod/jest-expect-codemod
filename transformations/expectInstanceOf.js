const getParams = (args1, args2) => {
  return {
    arguments1: [args1],
    identifier2: "toBeInstanceOf",
    arguments2: [args2],
  };
};

const getTransformedSource = (source, j) => {
  return j(source)
    .find(j.CallExpression, {
      callee: {
        object: {
          callee: {
            name: "expect",
          },
          arguments: [
            {
              operator: "instanceof",
            },
          ],
        },
        property: {
          name: "toBe",
        },
      },
    })
    .replaceWith(path => {
      const args1 = path.value.callee.object.arguments[0].left;
      const args2 = path.value.callee.object.arguments[0].right;
      const params = getParams(args1, args2);

      return j.expressionStatement(
        j.callExpression(
          j.memberExpression(
            j.callExpression(j.identifier("expect"), params.arguments1),
            j.identifier(params.identifier2),
          ),
          params.arguments2,
        ),
      );
    })
    .toSource();
};

export default function transformer(file, api) {
  const j = api.jscodeshift;

  let fileSource = file.source;
  fileSource = getTransformedSource(fileSource, j);
  return fileSource;
}
