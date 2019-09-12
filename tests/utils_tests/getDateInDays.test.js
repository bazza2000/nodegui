import _getDateInDays from '../../src/utils/_getDateInDays';

// test '_generateHiddenEmail' method
it('should return 11 as date is 11 days from today"', () => {
    let date = new Date();
    let yesterdaysDate = date.setDate( date.getDate() - 10 );
    yesterdaysDate = new Date(yesterdaysDate);
    console.log("Yesterday: " + yesterdaysDate);
    console.log("Today: " + new Date());
    expect(_getDateInDays(yesterdaysDate)).toEqual(11);
});