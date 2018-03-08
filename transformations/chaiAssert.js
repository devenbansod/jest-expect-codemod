const functionsToBeTransformed = [
  "isOk",
  "isNotOk",
  "equal",
  "notEqual",
  "strictEqual",
  "notStrictEqual",
  "deepEqual",
  "notDeepEqual",
  "isTrue",
  "isFalse",
  "isNotTrue",
  "isNotFalse",
];

const getParams = (propertyName, args, j) => {
  switch (propertyName) {
    case "isOk":
      return {
        arguments1: [args[0]],
        identifier2: "toBeTruthy",
        arguments2: [],
      };
    case "isNotOk":
      return {
        arguments1: [args[0]],
        identifier2: "not.toBeTruthy",
        arguments2: [],
      };

    case "equal":
      return {
        arguments1: [args[0]],
        identifier2: "toBe",
        arguments2: [args[1]],
      };
    case "notEqual":
      return {
        arguments1: [args[0]],
        identifier2: "not.toBe",
        arguments2: [args[1]],
      };

    case "deepEqual":
      return {
        arguments1: [args[0]],
        identifier2: "toEqual",
        arguments2: [args[1]],
      };
    case "notDeepEqual":
      return {
        arguments1: [args[0]],
        identifier2: "not.toEqual",
        arguments2: [args[1]],
      };

    case "throws":
      return {
        arguments1: [args[0]],
        identifier2: "toThrow",
        arguments2: [args[1]],
      };

    case "strictEqual":
      return {
        arguments1: [args[0]],
        identifier2: "toBe",
        arguments2: [args[1]],
      };
    case "notStrictEqual":
      return {
        arguments1: [args[0]],
        identifier2: "not.toBe",
        arguments2: [args[1]],
      };

    case "isTrue":
      return {
        arguments1: [args[0]],
        identifier2: "toBe",
        arguments2: [j.booleanLiteral(true)],
      };
    case "isNotTrue":
      return {
        arguments1: [args[0]],
        identifier2: "not.toBe",
        arguments2: [j.booleanLiteral(true)],
      };

    case "isFalse":
      return {
        arguments1: [args[0]],
        identifier2: "toBe",
        arguments2: [j.booleanLiteral(false)],
      };
    case "isNotFalse":
      return {
        arguments1: [args[0]],
        identifier2: "not.toBe",
        arguments2: [j.booleanLiteral(false)],
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
  functionsToBeTransformed.forEach(fnToTransform => {
    fileSource = getTransformedSource(fileSource, j, fnToTransform);
  });

  return fileSource;
}
