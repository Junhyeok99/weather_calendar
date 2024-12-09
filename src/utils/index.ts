import wd from './pjweather_info.json';

// 날짜 형식 문자열 생성 함수 추출
function formatDateString(year: number, month: number, day: number) {
  return `${month + 1}/${day}`;
}

// 요일 이름 배열 상수 추출
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function sliceDates(dates: Array<{ date: string; dayOfWeek: string }>, sliceCount: number) {
  return sliceCount < 0 ? dates.slice(dates.length + sliceCount) : dates.slice(0, sliceCount);
}

export function getMonthlyDates(
  year: number,
  month: number,
  sliceCount?: number, // 매개변수 기본값 설정
) {
  const dates: Array<{ date: string; dayOfWeek: string }> = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    dates.push({
      date: formatDateString(year, month, day),
      dayOfWeek: DAYS_OF_WEEK[date.getDay()],
    });
  }

  return sliceCount === undefined ? dates : sliceDates(dates, sliceCount);
}

// 백엔드 API가 이런 기능을 할 것이라고 가정하고 만든 함수
export function getWeatherDataByRegion(region: string) {
  //since we have region 1 - 16, input must be "1" - "16"
  return wd.filter((item) => item.region === region);
}
