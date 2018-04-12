# jest-expect-codemod
CodeMods for migrating `chai.assert`, `chai.expect`, `assert` -based test assertions to [jest's `expect`](https://facebook.github.io/jest/docs/en/expect.html) assertions

This repository contains a collection of codemod scripts for use with [JSCodeshift](https://github.com/facebook/jscodeshift).

*Currently, we don't support migration of all the assertions provided by these libraries, but PRs to add them are welcome. :-)*

<a href="https://travis-ci.org/devenbansod/jest-expect-codemod"><img alt="Travis Status" src="https://travis-ci.org/devenbansod/jest-expect-codemod.svg?branch=master"></a>

### Setup & Run

```sh
npm install -g jscodeshift
git clone https://github.com/devenbansod/jest-expect-codemod.git
jscodeshift -t <codemod-script> <file>
```

Use the `-d` option for a dry-run and use `-p` to print the output for
comparison.

### Included Scripts

#### Migrate from [`assert`](https://nodejs.org/api/assert.html)

```sh
jscodeshift -t jest-expect-codemod/transforms/assert.js <file>
```

#### Migrate from [`chai.assert`](https://chaijs.com/api/assert/)

```sh
jscodeshift -t jest-expect-codemod/transforms/chaiAssert.js <file>
```

#### Migrate from [`chai.expect`](https://chaijs.com/api/bdd/)

```sh
jscodeshift -t jest-expect-codemod/transforms/chaiExpect.js <file>
```

### Samples
#### Migrate from [`assert`](https://nodejs.org/api/assert.html)

##### Input
```js
module.exports = function() {
  const a = 1;
  assert.equal(a, 1);

  const b = {
    a: 2,
  };
  assert.deepEqual(b, {
    a: 2,
  });

  const c = true;
  assert.ok(c);

  const d = 5;
  assert.notEqual(d, 3);

  assert.throws(() => {
    throw new Error("Wrong value");
  }, /value/);

  const e = 1;
  assert.strictEqual(e, 1);
};
```

##### Output
```js
module.exports = function() {
  const a = 1;
  expect(a).toBe(1);

  const b = {
    a: 2,
  };
  expect(b).toEqual({
    a: 2,
  });

  const c = true;
  expect(c).toBeTruthy();

  const d = 5;
  expect(d).not.toBe(3);

  expect(() => {
    throw new Error("Wrong value");
  }).toThrow(/value/);

  const e = 1;
  expect(e).toBe(1);
};
```

#### Migrate from [`chai.assert`](https://chaijs.com/api/assert/)

##### Input
```js
module.exports = function() {
  const a = 1;
  assert.equal(a, 1);
  assert.notEqual(a, 3);

  const b = {
    a: 2,
  };
  assert.deepEqual(b, {
    a: 2,
  });
  assert.notDeepEqual(b, {
    c: 2,
  });

  const c = true;
  assert.isNotOk(!c);
  assert.isOk(c);

  assert.isNotTrue(!c);
  assert.isTrue(c);

  assert.isNotFalse(!c);
  assert.isNotFalse(c);

  const d = 1;
  assert.strictEqual(d, 1);
  assert.notStrictEqual(d, 2);
};
```

#### Migrate from [`chai.expect`](https://chaijs.com/api/bdd/)

##### Input
```js
module.exports = function() {
  const a = 1;
  expect(a).to.equal(1);

  const b = {
    a: 2,
  };
  expect(b).to.eql({
    a: 2,
  });
};
```

##### Output
```js
module.exports = function() {
  const a = 1;
  expect(a).toBe(1);

  const b = {
    a: 2,
  };
  expect(b).toEqual({
    a: 2,
  });
};
```

### Motivation
This was initially written with a motivation to ease the migration the tests in [babel](https://github.com/babel/babel) to Jest Expect assertions (tracked at [#7476](https://github.com/babel/babel/issues/7476)).
