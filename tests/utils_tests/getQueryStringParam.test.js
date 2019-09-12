import { _getQueryStringParam } from '../../src/utils/_getQueryStringParam';

it('should return the value "Harry" as only one query string param', () => {
    // mock window.location.search
    const mockedWindow = {
        location: {
            search: "?login_challenge=Harry"
        }
    }
    // query param to search for
    const param = "login_challenge";
    expect(_getQueryStringParam(param, mockedWindow)).toEqual("Harry");
});

it('should return the value "Jacks" as second query string param', () => {
    // mock window.location.search
    const mockedWindow = {
        location: {
            search: "?login_challenge=Harry&second_param=Jacks"
        }
    }
    // query param to search for
    const param = "second_param";
    expect(_getQueryStringParam(param, mockedWindow)).toEqual("Jacks");
});

it('should return the value "123" as third query string param', () => {
    // mock window.location.search
    const mockedWindow = {
        location: {
            search: "?login_challenge=Harry&second_param=Jacks&third_param=123"
        }
    }
    // query param to search for
    const param = "third_param";
    expect(_getQueryStringParam(param, mockedWindow)).toEqual("123");
});