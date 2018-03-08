module.exports = function() {
  const a = 1;
  expect(a).toBe(1);;

  const b = {
    a: 2,
  };
  expect(b).toEqual({
    a: 2,
  });;
};
