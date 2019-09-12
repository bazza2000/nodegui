import { validation } from '../../src/utils/validation/index';

// test 'required' method
it('should return "false" as we pass it a value and it is required.', () => {
    let value = "Harry";
    expect(validation.required(value)).toEqual(false);
});
it('should return "true" as we pass it an empty value and it is required.', () => {
    let value = "";
    expect(validation.required(value)).toEqual(true);
});

// test 'specialCharacters' method
it('should return "true" as we pass it a non-accepted character (¬) in the value.', () => {
    let value = "Harry¬";
    expect(validation.specialCharacters(value)).toEqual(true);
});
it('should return "false" as we pass it a only accepted characters in the value.', () => {
    let value = "HarryJacks77";
    expect(validation.specialCharacters(value)).toEqual(false);
});

// test 'minChar' method
it('should return "true" as we pass it a value thats length is less than the max.', () => {
    let value = "Harry";
    let max = 8;
    expect(validation.minChar(value, max)).toEqual(true);
});
it('should return "false" as we pass it a value thats length is greater or equal to the max.', () => {
    let value = "Harry123";
    let max = 8;
    expect(validation.minChar(value, max)).toEqual(false);
});

// test 'numbersOnly'
it('should return "true" as we pass it a non number.', () => {
    let value = "h";
    expect(validation.numbersOnly(value)).toEqual(true);
});

it('should return "false" as we pass it a number.', () => {
    let value = 1;
    expect(validation.numbersOnly(value)).toEqual(false); 
});