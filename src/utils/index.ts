import wd from './pjweather_info.json';

// 요일 이름 배열 상수 추출
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function sliceDates(dates: Array<{ date: string; dayOfWeek: string; day: string }>, sliceCount: number) {
  return sliceCount < 0 ? dates.slice(dates.length + sliceCount) : dates.slice(0, sliceCount);
}

export function getMonthlyDates(
  year: number,
  month: number,
  sliceCount?: number, // 매개변수 기본값 설정
) {
  const dates: Array<{ date: string; dayOfWeek: string; day: string }> = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    dates.push({
      day: day.toString(),
      date: `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
      dayOfWeek: DAYS_OF_WEEK[date.getDay()],
    });
  }

  return sliceCount === undefined ? dates : sliceDates(dates, sliceCount);
}

// 백엔드 API가 이런 기능을 할 것이라고 가정하고 만든 함수
export function getWeatherDataByRegion(region: string, year: number, month: number) {
  //since we have region 1 - 16, input must be "1" - "16"
  return wd
    .filter((item) => item.region === region && item.wthrDate.includes(`${year}-${month + 1}`))
    .map((item) => ({
      id: item.wthrIdx,
      region: item.region,
      date: item.wthrDate,
      tMax: item.wthrTMax,
      tMin: item.wthrTMin,
      weather: item.wthrSKY_PTY,
    }));
}
