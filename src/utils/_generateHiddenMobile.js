/*
 * Generates hidden mobile from a normal mobile
 * - Replaces certian characters of string with '*'s.
 */

export const _generateHiddenMobile = mobile => {
  return '*******' + mobile.substr(mobile.length - 4)
}