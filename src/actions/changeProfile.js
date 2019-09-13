import { APP_CONSTANTS } from '../constants/appConstants';

export function changeUsername(newState) {
  return { type: APP_CONSTANTS.USERNAME, newState };
}


export function changeUserProfile(newState) {
  return { type: APP_CONSTANTS.PROFILE, newState };
}


export function changeCurrentLocation(newState) {
  return { type: APP_CONSTANTS.CURRENTLOCATION, newState };
}
