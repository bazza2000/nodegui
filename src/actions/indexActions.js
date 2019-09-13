/*
 * ACTIONS index file
 * - All action methods are pulled through this file.
 * - Use camel case for method names.
 *
 * - Actions can be called through actions.METHOD() etc.
 */

import { changeUsername, changeUserProfile, changeCurrentLocation  } from './changeProfile';


export const actions = {
  changeUsername: changeUsername,
  changeUserProfile : changeUserProfile,
  changeCurrentLocation : changeCurrentLocation
};
