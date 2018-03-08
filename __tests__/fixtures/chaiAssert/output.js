module.exports = function() {
  const a = 1;
  expect(a).toBe(1);;
  expect(a).not.toBe(3);;

  const b = {
    a: 2,
  };
  expect(b).toEqual({
    a: 2,
  });;
  expect(b).not.toEqual({
    c: 2,
  });;

  const c = true;
  expect(!c).not.toBeTruthy();;
  expect(c).toBeTruthy();;

  expect(!c).not.toBe(true);;
  expect(c).toBe(true);;

  expect(!c).not.toBe(false);;
  expect(c).not.toBe(false);;

  const d = 1;
  expect(d).toBe(1);;
  expect(d).not.toBe(2);;
};
