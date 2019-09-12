import { _generatePinLabel } from '../../src/utils/_generatePinLabel';

// test '_generateHiddenEmail' method
it('should return "1st digit"', () => {
  let value = 1;
  expect(_generatePinLabel(value)).toEqual("1st digit");
});
it('should return "2nd digit"', () => {
  let value = 2;
  expect(_generatePinLabel(value)).toEqual("2nd digit");
});
it('should return "3rd digit"', () => {
  let value = 3;
  expect(_generatePinLabel(value)).toEqual("3rd digit");
});
it('should return "4th digit"', () => {
  let value = 4;
  expect(_generatePinLabel(value)).toEqual("4th digit");
});
it('should return "5th digit"', () => {
  let value = 5;
  expect(_generatePinLabel(value)).toEqual("5th digit");
});
it('should return "6th digit"', () => {
  let value = 6;
  expect(_generatePinLabel(value)).toEqual("6th digit");
});