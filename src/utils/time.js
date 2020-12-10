// https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
export function msToTime(s) {
  var ms = s % 1000
  s = (s - ms) / 1000
  var secs = s % 60
  s = (s - secs) / 60
  var mins = s % 60
  var hrs = (s - mins) / 60

  if (hrs) {
    return `${hrs}時間${mins}分${secs}秒`
  }
  if (mins) {
    return `${mins}分${secs}秒`
  }

  return `${secs}秒`
}
