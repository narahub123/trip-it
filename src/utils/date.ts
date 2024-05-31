export const weekOfDay: string[] = ["일", "월", "화", "수", "목", "금", "토"];

// 날짜는 자정 시간으로 고정
export const dateMidFormatter = (origin: Date) =>
  new Date(origin.setHours(0, 0, 0, 0));

// 달에 따른 날짜 계산하기
// 한 달전 날짜
export const monthAgo = (origin: Date) =>
  dateMidFormatter(new Date(origin.setMonth(origin.getMonth() - 1)));
// 이 달
export const curMonth = (origin: Date) => dateMidFormatter(origin);
// 다음달 날짜
export const monthLater = (origin: Date) =>
  dateMidFormatter(new Date(origin.setMonth(origin.getMonth() + 1)));

// 날짜 분해하기
export const destrucDate = (origin: Date) => {
  const year = origin.getFullYear();
  const month = origin.getMonth();
  const date = origin.getDate();

  return { year, month, date };
};

// 달의 마지막 날 구하기
const lastDayOfMonth = (origin: Date) => {
  const date = destrucDate(origin);

  return new Date(date.year, date.month + 1, 0).getDate();
};

// 달의 첫번째날 요일 구하기
const weekOfFirstDay = (origin: Date) => {
  const date = destrucDate(origin);

  return new Date(date.year, date.month, 1).getDay();
};

// 달의 날짜 구하기
export const datesOfMonth = (origin: Date) => {
  const dates: number[] = [];

  const date = dateMidFormatter(origin);

  const firstDay = weekOfFirstDay(date);
  const lastDate = lastDayOfMonth(date);
  const lastDateOfLastMonth = lastDayOfMonth(monthAgo(date));

  // 첫날이 일요일 아닌 경우 지난 달의 날짜 추가하기
  if (firstDay !== 0) {
    for (let i = firstDay - 1; i >= 0; i--) {
      const lastMonthDate = lastDateOfLastMonth - i;
      dates.push(lastMonthDate);
    }
  }

  for (let i = 1; i <= lastDate; i++) {
    dates.push(i);
  }

  return dates;
};

// 여행 가능 날짜부터 10일 구하기
export const tenDaysLater = (start: Date) => {
  const startDate = new Date(start);
  const date = new Date(startDate.setDate(startDate.getDate() + 10));
  return date;
};

export const getWeek = (origin: Date) => {
  const date = new Date(origin);

  const week = date.getDay();

  return weekOfDay[week];
};

// 시작 날짜와 종료 날짜를 이용해서 일정 날짜 배열 구하기
// 시작 날짜와 종료 날짜를 이용해 일정 차이 구하기
const dateDiff = (date1: Date, date2: Date) =>
  Math.abs((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));

// 일정 차이를 이용해서 일정 날짜 배열을 구하기
export const CalculateDuration = (date1: string, date2: string) => {
  const duration = [];

  const dateDate1 = new Date(date1);
  const dateDate2 = new Date(date2);

  if (date1 && date2) {
    const formattedDate1 = dateMidFormatter(dateDate1);
    const formattedDate2 = dateMidFormatter(dateDate2);

    const diffs = dateDiff(formattedDate1, formattedDate2);

    for (let i = 0; i <= diffs; i++) {
      const newDate = destrucDate(
        new Date(formattedDate1.setDate(formattedDate1.getDate() + i))
      );

      duration.push(newDate);
    }
  }

  return duration;
};
