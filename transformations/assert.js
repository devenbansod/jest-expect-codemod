const functionsToBeTransformed = [
  "ok",
  "equal",
  "deepEqual",
  "notEqual",
  "throws",
  "throw",
  "strictEqual",
  "doesNotThrow",
  "deepStrictEqual",
  "notStrictEqual",
  "isFalse",
  "isTrue",
  "isUndefined",
];

const getParams = (propertyName, args, j) => {
  switch (propertyName) {
    case "ok":
      return {
        arguments1: [args[0]],
        identifier2: "toBeTruthy",
        arguments2: [],
      };

    case "equal":
      return {
        arguments1: [args[0]],
        identifier2: "toBe",
        arguments2: [args[1]],
      };

    case "deepEqual":
    case "deepStrictEqual":
      return {
        arguments1: [args[0]],
        identifier2: "toEqual",
        arguments2: [args[1]],
      };

    case "notEqual":
    case "notStrictEqual":
      return {
        arguments1: [args[0]],
        identifier2: "not.toBe",
        arguments2: [args[1]],
      };

    case "throws":
    case "throw":
      return {
        arguments1: [args[0]],
        identifier2: "toThrow",
        arguments2: args.length > 1 ? [args[1]] : [],
      };
    case "doesNotThrow":
      return {
        arguments1: [args[0]],
        identifier2: "not.toThrow",
        arguments2: args.length > 1 ? [args[1]] : [],
      };

    case "strictEqual":
      return {
        arguments1: [args[0]],
        identifier2: "toBe",
        arguments2: [args[1]],
      };

    case "isFalse":
      return {
        arguments1: [args[0]],
        identifier2: "toBe",
        arguments2: [j.booleanLiteral(false)],
      };

    case "isTrue":
      return {
        arguments1: [args[0]],
        identifier2: "toBe",
        arguments2: [j.booleanLiteral(true)],
      };

    case "isUndefined":
      return {
        arguments1: [args[0]],
        identifier2: "toBeUndefined",
        arguments2: [],
      };
  }
};

const getTransformedSource = (source, j, fnToTransform) => {
  return j(source)
    .find(j.CallExpression, {
      callee: {
        object: {
          name: "assert",
        },
        property: {
          name: fnToTransform,
        },
      },
    })
    .replaceWith(path => {
      const args = path.value.arguments;
      const params = getParams(fnToTransform, args, j);

      const a = j.callExpression(
        j.memberExpression(
          j.callExpression(j.identifier("expect"), params.arguments1),
          j.identifier(params.identifier2),
        ),
        params.arguments2,
      );
      return a;
    })
    .toSource();
};

export default function transformer(file, api) {
  const j = api.jscodeshift;

  let fileSource = file.source;
  functionsToBeTransformed.forEach(fnToTransform => {
    fileSource = getTransformedSource(fileSource, j, fnToTransform);
  });

  return fileSource;
}
