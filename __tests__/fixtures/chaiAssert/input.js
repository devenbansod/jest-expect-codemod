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
