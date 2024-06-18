import { DestrucDateType } from "../pages/schedule/choice/dates/Calendar";

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

// 시간 분해하기
const destructTime = (origin: Date) => {
  const year = origin.getFullYear();
  const month = origin.getMonth();
  const date = origin.getDate();
  const hour = origin.getHours();
  const minute = origin.getMinutes();
  const second = origin.getSeconds();

  return {
    year,
    month,
    date,
    hour,
    minute,
    second,
  };
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
export const CalculateDuration = (
  start: string,
  end: string
): DestrucDateType[] => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dates: DestrucDateType[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(destrucDate(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// 날짜형식 자바에 맞게 변경하기(보낼 형식 : 240607)
export const dateFormatToLocalDate = (origin: string) => {
  const newDate = destrucDate(new Date(origin));

  const date = `${newDate.year}${
    newDate.month < 10 ? "0" + newDate.month : newDate.month
  }${newDate.date < 10 ? "0" + newDate.date : newDate.date}`;

  return date;
};

// 자바에서 받은 날짜 형식 자바스크립트에 맞게 변경하기(받는 형식 240607)
export const dateFormatFromLocalDate = (origin: string) => {
  const year = Number(origin.slice(0, 4)); // 2024
  const month = Number(origin.slice(4, 6)) - 1; // 06 : date 객체에서 달의 시작은 0임을 주의!
  const date = Number(origin.slice(6)); // 07

  // date 형식으로 리턴 시
  const newDate = new Date(year, month, date);

  // destruct 형식으로 리턴시
  const newDateDest = destrucDate(newDate);

  return;
};

// 시간 형식을 자바에 맞게 변경하기 (240607102531)
export const dateFormateToLocalDatetime = (origin: string) => {
  const newDate = destructTime(new Date(origin));
  const date = `
    ${newDate.hour < 10 ? "0" + newDate.hour : newDate.hour}:${
    newDate.minute < 10 ? "0" + newDate.minute : newDate.minute
  }`;

  console.log(date);

  return date;
};

// 자바에서 받은 시간 형식 자바스크립트에 맞게 변경하기(240607102531)
export const dateFormateFromLocalDatetime = (origin: string) => {
  const year = Number(origin.slice(0, 4)); // 2024
  const month = Number(origin.slice(4, 6)) - 1; // 06 : date 객체에서 달의 시작은 0임을 주의!
  const date = Number(origin.slice(6, 8)); // 07
  const hour = Number(origin.slice(8, 10)); // 10
  const minute = Number(origin.slice(10, 12)); // 25
  const second = Number(origin.slice(12)); // 31

  // date 객체 형식으로 리턴하는 경우
  const newDate = new Date(year, month, date, hour, minute, second);

  // destruct 형식으로 리턴하는 경우
  const newDateDest = destructTime(newDate);

  return newDate;
};
