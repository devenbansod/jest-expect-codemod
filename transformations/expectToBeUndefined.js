const getParams = args1 => {
  return {
    arguments1: args1,
    identifier2: "toBeUndefined",
    arguments2: [],
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
        },
      },
      arguments: [
        {
          name: "undefined",
        },
      ],
    })
    .replaceWith(path => {
      const args1 = path.value.callee.object.arguments;
      const params = getParams(args1);

      return j.expressionStatement(
        j.callExpression(
          j.memberExpression(
            j.callExpression(j.identifier("expect"), params.arguments1),
            j.identifier(params.identifier2),
          ),
          [],
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
