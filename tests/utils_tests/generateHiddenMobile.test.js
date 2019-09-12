import { _generateHiddenMobile } from '../../src/utils/_generateHiddenMobile';

// test '_generateHiddenEmail' method
it('should return "*******5678"', () => {
    let value = "07712345678";
    expect(_generateHiddenMobile(value)).toEqual("*******5678");
});