/*
 * Generates Pin Labels based on integer.
 */

export const _generatePinLabel = pinPos => {
  let pinPosValue = '';
  switch (pinPos) {
  case '1':
  case 1:
  case "First":
    pinPosValue = "1st digit"
    break;
  case '2':
  case 2:
  case "Second":
    pinPosValue = "2nd digit"
    break;
  case '3':
  case 3:
  case "Third":
    pinPosValue = "3rd digit"
    break;
  case '4':
  case 4:
  case "Fourth":
    pinPosValue = "4th digit"
    break;
  case '5':
  case 5:
  case "Fifth":
    pinPosValue = "5th digit"
    break;
  case '6':
  case 6:
  case "Sixth":
    pinPosValue = "6th digit"
    break;
  default:
  }
  return pinPosValue;
}