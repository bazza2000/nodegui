/*
 * Generates hidden email from a normal email
 * - Replaces certian characters of string with '*'s.
 */

export const _generateHiddenEmail = email => {
  let first = email.charAt(0);
  let stars = email.split("@")[0].length-2;
  let second = '*'.repeat(stars);
  let name = email.split("@")[0];
  let third = name.charAt(name.length-1) + "@"
  let fourth = email.split("@")[1];
  return first + second + third + fourth
}