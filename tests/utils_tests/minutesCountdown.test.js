import _minutesCountdown from '../../src/utils/_minutesCountdown';

it('should return "00:05:00" after 1 second', () => {
    const value = "00:05:00";
    console.log(_minutesCountdown(value));
    expect(_minutesCountdown(value)).toEqual("00:04:59");
});

it('should return "" after 1 second', () => {
    const value = "aa:bb:cc";
    expect(_minutesCountdown(value)).toEqual("");
});