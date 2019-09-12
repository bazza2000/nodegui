import { APP_CONSTANTS } from '../constants/appConstants';

export function changeUsername(newState) {
  return { type: APP_CONSTANTS.USERNAME, newState };
}
