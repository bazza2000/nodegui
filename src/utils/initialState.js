/* 
 * The initial application state
 */
 
const initialState = {
  userName: '',
  credentials: {
    password: '',
    pinPos1: 0,
    pinVal1: '',
    pinPos2: 3,
    pinVal2: '',
    otp: ''
  },
  profile: {},
  deviceDetails :{
    isDeviceRegistered: '',
    enabledDevices: [],
    showInfoMobileAppJourney: false
  },
  challenge: '',
  channel: '',
  grants: '',
  currentlySending: false,
  currentLocation: '',
  extendedTimeout: false,
  errorMessage: "",
  loginErrorCountdown: "",
  journey: "",
  journeyId: ""
}

// Example data returned state
// const initialState = {
//   userName: 'HarryJacks77',
//   credentials: {
//     password: '',
//     pinPos1: 0,
//     pinValue1: '',
//     pinPos2: 3,
//     pinValue2: '',
//     otp: ''
//   },
//   profile: {
//     email: 'harryjacks@outlook.com',
//     mobile: '',
//     digitalCustomerId:'CB0000004234', // for soft token journey
//     userName: '',
//     scaPreference: 'NONE',
//     newscaPreference: '',
//     showInfo: true,
//     showInfoOTPJourney: false,
//     showInfoMobileAppJourney: false
//   },
//   deviceDetails :{
//     isDeviceRegistered: '',
//     enabledDevices: [],
//     showInfoMobileAppJourney: false
//   },
//   challenge: 'e5f291f07d694bfc82728f77048dc716',
//   channel: 'Online Secure',
//   grants: [
//     'ViewTransactionsUnlimited'
//   ],
//   currentlySending: false,
//   code: {
//     code1: '',
//     code2: ''
//   },
//   code1Error: false,
//   code2Error: false,
//   currentLocation: '',
//   errorMessage: "", // ["login.fail", "login.lastAttempt", "login.countdown", "login.locked"]
//   loginErrorCountdown: "",
//   journey: ""
// }

export default initialState