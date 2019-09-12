const _getDateInDays = date1 => {
  let date = new Date(date1);
  var today = new Date();
  var diffTime = Math.abs(today.getTime() - date.getTime());
  var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default _getDateInDays