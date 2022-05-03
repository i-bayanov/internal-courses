export default function server(options) {
  const {
    year, month, day, flag,
  } = JSON.parse(options.body);
  const numberOfDay = new Date(year, month - 1, day).getDay();
  const WEEK_DAY_SHORT_NAMES = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const WEEK_DAY_LONG_NAMES = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
  const dayOfWeek = flag ? WEEK_DAY_SHORT_NAMES[numberOfDay] : WEEK_DAY_LONG_NAMES[numberOfDay];

  return JSON.stringify(dayOfWeek);
}
