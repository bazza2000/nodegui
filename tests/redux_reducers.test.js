import data from '../src/reducers/update-reducer';
import initialState from '../src/utils/initialState';

describe('update reducer', () => {

  it('should return the initial state', () => {
    expect(data(undefined, {})).toEqual(initialState)
  })

  it('should handle USERNAME', () => {
    expect(
      data([], {
        type: 'USERNAME',
        newState: 'Harry'
      })
    ).toEqual({"userName": "Harry"})
  })

  it('should handle PROFILE', () => {
    expect(
      data([], {
        type: 'PROFILE',
        newState: {"digitalCustomerId": "Haz77", "email": "harryjacks@outlook.com", "scaPreference": "Email", "userName": "Harry"}
      })
    ).toEqual({"profile": {"digitalCustomerId": "Haz77", "email": "harryjacks@outlook.com", "scaPreference": "Email", "userName": "Harry"}})
  })

  it('should handle Challenge', () => {
    expect(
      data([], {
        type: 'CHALLENGE',
        newState: '1234567890'
      })
    ).toEqual({"challenge": "1234567890"})
  })

  it('should handle GRANTS', () => {
    expect(
      data([], {
        type: 'GRANTS',
        newState: ["ViewTransactionsUnlimited"]
      })
    ).toEqual({"grants": ["ViewTransactionsUnlimited"]})
  })

  it('should handle CHANNEL', () => {
    expect(
      data([], {
        type: 'CHANNEL',
        newState: "Online Secure"
      })
    ).toEqual({"channel": "Online Secure"})
  })

  it('should handle SET_AUTH', () => {
    expect(
      data([], {
        type: 'SET_AUTH',
        newState: "EMAIL"
      })
    ).toEqual({"authStrategy": "EMAIL"})
  })

  it('should handle JOURNEY', () => {
    expect(
      data([], {
        type: 'JOURNEY',
        newState: "new journey"
      })
    ).toEqual({"journey": "new journey"})
  })

  it('should handle REMEMBERUSERNAME', () => {
    expect(
      data([], {
        type: 'REMEMBERUSERNAME',
        newState: true
      })
    ).toEqual({"rememberUsername": true})
  })

  it('should handle DEVICE_DETAILS', () => {
    expect(
      data([], {
        type: 'DEVICE_DETAILS',
        newState: "some details"
      })
    ).toEqual({"deviceDetails": "some details"})
  })

  it('should handle EXTENDEDTIMEOUT', () => {
    expect(
      data([], {
        type: 'EXTENDEDTIMEOUT',
        newState: true
      })
    ).toEqual({"extendedTimeout": true})
  })

  it('should handle non-existing-value', () => {
    expect(
      data([], {
        type: 'non-existing-value',
        newState: ""
      })
    ).toEqual([])
  })

})