export function getGMTTimeZone() {
  var timezoneOffsetMin = new Date().getTimezoneOffset(),
    offsetHrs = Math.abs(Math.floor(timezoneOffsetMin / 60)),
    offsetMin = Math.abs(timezoneOffsetMin % 60),
    timezoneStandard;
  let finalOffsetHrs = offsetHrs < 10 ? "0" + offsetHrs : offsetHrs.toString();
  let finalOffsetMin = offsetMin < 10 ? "0" + offsetMin : offsetMin.toString();

  // Add an opposite sign to the offset
  // If offset is 0, it means timezone is UTC
  if (timezoneOffsetMin < 0)
    timezoneStandard = "+" + finalOffsetHrs + ":" + finalOffsetMin;
  else if (timezoneOffsetMin > 0)
    timezoneStandard = "-" + finalOffsetHrs + ":" + finalOffsetMin;
  else if (timezoneOffsetMin == 0) timezoneStandard = "Z";

  // Timezone difference in hours and minutes
  // String such as +5:30 or -6:00 or Z
  return timezoneStandard;
}
