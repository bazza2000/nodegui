const _minutesCountdown = duration => {

  let milliseconds = (Number(duration.split(":")[0]) * 3600000) + (Number(duration.split(":")[1]) * 60000) + (Number(duration.split(":")[2] * 1000));

  milliseconds = milliseconds - 1000; // minus a second always

  let ms = milliseconds % 1000;
  milliseconds = (milliseconds - ms) / 1000;
  let secs = milliseconds % 60;
  milliseconds = (milliseconds - secs) / 60;
  let mins = milliseconds % 60;
  let hrs = (milliseconds - mins) / 60;

  // add zero if its needed
  if (hrs.toString().length < 2) { hrs = "0" + hrs };
  if (mins.toString().length < 2) { mins = "0" + mins };
  if (secs.toString().length < 2) { secs = "0" + secs };

  if (isNaN(hrs) || isNaN(mins) || isNaN(secs)) {
    return '';
  } else {
    return hrs + ':' + mins + ':' + secs;
  }

}

export default _minutesCountdown