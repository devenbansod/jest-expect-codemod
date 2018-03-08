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
