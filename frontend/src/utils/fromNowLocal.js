import moment from "moment";

export const fromNowLocal = (ts, locale = "en-post") =>
  moment
    .parseZone(ts) // trust whatever zone the string already has (Z, +02:00, or none)
    .local() // show it in the user’s local zone
    .locale(locale)
    .fromNow();
