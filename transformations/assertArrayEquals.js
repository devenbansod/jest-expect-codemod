/**
 * This transformation was specially written for babel's usecase,
 * since they were using an alias assertArrayEquals for assert.deepEqual
 */

const getParams = (propertyName, args) => {
  return {
    arguments1: args.slice(1),
    identifier2: "toEqual",
    arguments2: args.slice(0, 1),
  };
};

const getTransformedSource = (source, j, fnToTransform) => {
  return j(source)
    .find(j.CallExpression, {
      callee: {
        name: "assertArrayEquals",
      },
    })
    .replaceWith(path => {
      const args1 = path.value.arguments;
      const params = getParams(fnToTransform, args1);

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
