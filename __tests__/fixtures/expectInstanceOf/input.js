module.exports = function() {
  const a = { b: 1 };
  expect(a instanceof Object).toBe(true);
};
