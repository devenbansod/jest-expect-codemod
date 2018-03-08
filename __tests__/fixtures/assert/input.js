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
