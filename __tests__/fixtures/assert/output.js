module.exports = function() {
  const a = 1;
  expect(a).toBe(1);;

  const b = {
    a: 2,
  };
  expect(b).toEqual({
    a: 2,
  });;

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
