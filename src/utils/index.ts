import wd from './pjweather_info.json'

export function getMonthlyDates(year: number, month: number) {
  // month is 0-indexed: January is 0, February is 1, ..., December is 11
  const dates = [];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const firstDay = new Date(year, month, 1); // First day of the month
  const lastDay = new Date(year, month + 1, 0); // Last day of the month

  for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    dates.push({
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      dayOfWeek: daysOfWeek[date.getDay()]
    });
  }

  return dates;
}

export function getWeatherDataByRegion(region: string) {
  //since we have region 1 - 16, input must be "1" - "16"
  return wd.filter(item => item.region === region);
}