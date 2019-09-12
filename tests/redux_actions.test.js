import { actions } from '../src/actions/indexActions';
import { APP_CONSTANTS } from '../src/constants/appConstants';

// REDUX USERNAME 
describe('actions', () => {
  it('Should create an action to change USERNAME', () => {
    const newState = 'USERNAME'
    const expectedAction = {
      type: APP_CONSTANTS.USERNAME,
      newState
    }
    expect(actions.changeUsername(newState)).toEqual(expectedAction)
  })
});

// REDUX CHALLENGE 
describe('actions', () => {
  it('Should create an action to change CHALLENGE', () => {
    const newState = 'CHALLENGE'
    const expectedAction = {
      type: APP_CONSTANTS.CHALLENGE,
      newState
    }
    expect(actions.changeChallenge(newState)).toEqual(expectedAction)
  })
});

// REDUX CHANNEL 
describe('actions', () => {
  it('Should create an action to change CHANNEL', () => {
    const newState = 'CHANNEL'
    const expectedAction = {
      type: APP_CONSTANTS.CHANNEL,
      newState
    }
    expect(actions.changeChannel(newState)).toEqual(expectedAction)
  })
});

// REDUX GRANTS 
describe('actions', () => {
  it('Should create an action to change credential data', () => {
    const newState = 'GRANTS'
    const expectedAction = {
      type: APP_CONSTANTS.GRANTS,
      newState
    }
    expect(actions.changeGrants(newState)).toEqual(expectedAction)
  })
});

// REDUX PROFILE 
describe('actions', () => {
  it('Should create an action to change PROFILE', () => {
    const newState = 'PROFILE'
    const expectedAction = {
      type: APP_CONSTANTS.PROFILE,
      newState
    }
    expect(actions.changeProfileData(newState)).toEqual(expectedAction)
  })
});

// REDUX REMEMBERUSERNAME 
describe('actions', () => {
  it('Should create an action to change REMEBERUSERNAME', () => {
    const newState = true
    const expectedAction = {
      type: APP_CONSTANTS.REMEMBERUSERNAME,
      newState
    }
    expect(actions.changeRememberUsername(newState)).toEqual(expectedAction)
  })
});

// REDUX SET_AUTH 
describe('actions', () => {
  it('Should create an action to change SET_AUTH', () => {
    const newState = "SET_AUTH"
    const expectedAction = {
      type: APP_CONSTANTS.SET_AUTH,
      newState
    }
    expect(actions.changeAuthStrategy(newState)).toEqual(expectedAction)
  })
});

// REDUX DEVICE_DETAILS 
describe('actions', () => {
  it('Should create an action to change DEVICE_DETAILS', () => {
    const newState = "DEVICE_DETAILS"
    const expectedAction = {
      type: APP_CONSTANTS.DEVICE_DETAILS,
      newState
    }
    expect(actions.changeDeviceDetails(newState)).toEqual(expectedAction)
  })
});

// REDUX EXTENDEDTIMEOUT 
describe('actions', () => {
  it('Should create an action to change EXTENDEDTIMEOUT', () => {
    const newState = "EXTENDEDTIMEOUT"
    const expectedAction = {
      type: APP_CONSTANTS.EXTENDEDTIMEOUT,
      newState
    }
    expect(actions.changeExtendedTimeout(newState)).toEqual(expectedAction)
  })
});