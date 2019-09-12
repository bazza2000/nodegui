import { _generateHiddenEmail } from '../../src/utils/_generateHiddenEmail';

// test '_generateHiddenEmail' method
it('should return "t*******l@email.com"', () => {
    let value = "testemail@email.com";
    expect(_generateHiddenEmail(value)).toEqual("t*******l@email.com");
});