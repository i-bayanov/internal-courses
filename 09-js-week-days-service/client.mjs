export default async function client(
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  day = new Date().getDate(),
  flag = false,
) {
  const YEAR = Number(year) || (() => { throw new Error('Неверный формат года'); })();
  const MONTH = Number(month) || (() => { throw new Error('Неверный формат месяца'); })();
  const DAY = Number(day) || (() => { throw new Error('Неверный формат дня'); })();
  const FLAG = (() => {
    if (typeof flag === 'boolean') { return flag; }
    if (flag === 'false') { return false; }
    if (flag === 'true') { return true; }

    throw new Error('Неверный формат флага');
  })();
  const body = JSON.stringify({
    year: YEAR,
    month: MONTH,
    day: DAY,
    flag: FLAG,
  });
  const res = await insteadOfFetch('./server.mjs', {
    method: 'POST',
    body,
  });
  const result = JSON.parse(res);

  console.log(result);
}

async function insteadOfFetch(url, options) {
  const obj = await import(url);
  const code = obj.default;

  return code(options);
}

client(process.argv[2], process.argv[3], process.argv[4], process.argv[5]).catch(console.log);
