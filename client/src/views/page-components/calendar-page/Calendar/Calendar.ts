import {
  CalendarData,
  Date,
  Day,
  DayInfos,
  HTMLText,
  Month,
  Offset,
  ServerHistoryData,
  TargetDateInfos,
  Year,
} from '@src/types';
import { createDOMWithSelector } from '@src/utils/helper';

import './Calendar.scss';

const ALL_DAY_ON_CALENDAR = 42;

export default class CalendarView {
  $calendarTable: HTMLElement;
  $tbody: HTMLElement;
  calendarData: CalendarData;
  dayObj: { year: Year; month: Month };

  constructor({ parent, currentYear, currentMonth, currentCalendarData }) {
    this.calendarData = this.processServerDataIntoCalendarData(currentCalendarData);
    this.dayObj = { year: currentYear, month: currentMonth };

    this.$calendarTable = createDOMWithSelector('table', '.calendar__table');
    parent.appendChild(this.$calendarTable);
    this.render();

    console.log(this.calendarData);
  }

  render() {
    this.$calendarTable.innerHTML = `
      <thead>
        ${this.getDayDOM()}
      <thead>
      <tbody>
        ${this.getFullDateOnCalendarDOM(this.dayObj)}
      <tbody>
    `;
  }

  /**
   * 캘린더 상단에 요일 표기를 위한 DOM을 반환합니다.
   */
  getDayDOM(): HTMLText {
    return `
      <tr>
        <td>SUN</td><td>MON</td><td>TUE</td>
        <td>WED</td><td>THU</td><td>FRI</td><td>SAT</td>
      </tr>
    `;
  }

  /**
   * 달력의 모든 날짜 DOM을 생성합니다.
   * 1. 지난 달의 마지막 날짜, 이번 달의 마지막 날짜, 이번 1일의 요일을 얻습니다.
   * 2. 요일 데이터와 1일의 offset을 얻습니다.
   * 3. 모든 달력 데이터에 Offset을 적용시킵니다.
   * 4. 총 42개에 해당하는 지난달, 현재, 다음 달 데이터를 얻습니다.
   * 5. 달력을 주 단위로 분할합니다.
   * 6. 분할한 달력을 DOM으로 변환합니다.
   */
  getFullDateOnCalendarDOM(date: TargetDateInfos): HTMLText {
    const { year: TARGET_YEAR, month: TARGET_MONTH } = date;

    const lastDateOnPrevMonth: Date = new Date(TARGET_YEAR, TARGET_MONTH - 1, 0).getDate();
    const lastDateOnCurrentMonth: Date = new Date(TARGET_YEAR, TARGET_MONTH, 0).getDate();
    const startDayOnCurrentMonth: Day = new Date(TARGET_YEAR, TARGET_MONTH - 1, 1).getDay();

    const dayOffset: Offset = this.getDayOffset(startDayOnCurrentMonth);
    const calendarWithOffset: Offset[] = this.getCalendarWithOffset(dayOffset);
    const calendar: DayInfos[] = this.getCalendar(calendarWithOffset, lastDateOnPrevMonth, lastDateOnCurrentMonth);
    const splitedCalendar: DayInfos[][] = this.getSplitedCalendar(calendar);
    const $calendarDOM = this.getCalendarDOM(splitedCalendar).join('');

    return $calendarDOM;
  }

  /**
   * Calendar Data를 순회하며,
   * week에 해당하는 모든 <tr> 태그를 얻고 반환합니다.
   */
  getCalendarDOM(data: DayInfos[][]) {
    return data.reduce((acc, week) => [...acc, this.getWeekDOM(week)], []);
  }

  /**
   * 배열을 순회하며,
   * tr 태그에 해당하는 weekDOM을 생성합니다.
   * ex) <tr>
   *        <td>1</td>
   *        <td>2</td>
   *        ...
   *     </tr>
   */
  getWeekDOM(week: DayInfos[]): HTMLText {
    const $tr = createDOMWithSelector('tr');

    week.forEach(({ day, isCurrentMonthDate }) => {
      const $td = createDOMWithSelector('td');

      if (!isCurrentMonthDate) $td.classList.add('not-current-month-date');
      $td.innerText = `${day}`;
      $tr.appendChild($td);
    });

    return $tr.outerHTML;
  }

  /**
   * 달력을 일주일 단위로 분할합니다.
   */
  getSplitedCalendar(calendar: DayInfos[]): DayInfos[][] {
    const DAY_PER_WEEK = 7;
    const CHUNK = DAY_PER_WEEK;

    const splitedCalendar = [];

    for (let i = 0; i < calendar.length; i += CHUNK) {
      splitedCalendar.push(calendar.slice(i, i + CHUNK));
    }

    return splitedCalendar;
  }

  /**
   * 이전 달 날짜들, 이번 달 날짜들, 다음 달 날짜들을 구분하여
   * Date 데이터로 만듭니다.
   */
  getCalendar(calendarWithOffset: Offset[], lastDateOnPrevMonth: Date, lastDateOnCurrentMonth: Date): DayInfos[] {
    const splitedPoint1: Day = calendarWithOffset.findIndex((offset) => offset === 0);
    const prevMonthDays: DayInfos[] = calendarWithOffset
      .splice(0, splitedPoint1 + 1)
      .reduce((acc, offset) => [...acc, { day: offset + lastDateOnPrevMonth, isCurrentMonthDate: false }], []);

    const splitedPoint2: Day = calendarWithOffset.findIndex((offset) => offset === lastDateOnCurrentMonth);
    const nextMonthDays: DayInfos[] = calendarWithOffset
      .splice(splitedPoint2 + 1)
      .reduce((acc, offset) => [...acc, { day: offset - lastDateOnCurrentMonth, isCurrentMonthDate: false }], []);

    const currentMonthDays: DayInfos[] = calendarWithOffset //
      .reduce((acc, offset) => [...acc, { day: offset, isCurrentMonthDate: true }], []);

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }

  /**
   * 달력에서 보여지는 date 들이
   * 1일을 기준으로 얼마나 차이나는 지 계산하여 반환합니다.
   * 만약, 첫번째 수요일이 1이라면
   * 월요일은 -1, 화요일은 0, ... 이 됩니다.
   */
  getCalendarWithOffset(offset: Offset): Offset[] {
    return [...new Array(ALL_DAY_ON_CALENDAR).keys()].map((idx) => idx - offset);
  }

  /**
   * 달의 첫 날의 요일을 계산하여,
   * 요일과 날짜의 차이값 dayOffset을 반환합니다.
   */
  getDayOffset(day: Day): Offset {
    const dayIdx = day === 6 ? 0 : day;
    const FIRST_DATE = 1;
    return dayIdx - FIRST_DATE;
  }

  /**
   * 서버의 데이터를 받아,
   * View 를 위해 사용할 데이터를 가공합니다.
   * 서버 데이터를 iterate 하며 다음 공정을 거칩니다.
   * 1. expenditureDay 별로 데이터를 구분합니다.
   * 2. price를 totalIncome / totalExpenditure 에 더합니다. 구분 기준 => categoryName === 'income' or else
   * 3. 현재 데이터의 중복되지 않는 카테고리를 구합니다.
   *
   * FIXME: 현재 더 좋은 로직이 생각나지 않고,
   * 시간이 없기에 그냥 넘어가지만
   * 리팩토링을 한다면 더 좋은 로직으로 개선할 수 있다고 생각합니다.
   */
  processServerDataIntoCalendarData(history: ServerHistoryData[]) {
    const calendarData: CalendarData = {
      dayData: {},
      containCategory: [],
      totalIncome: 0,
      totalExpenditure: 0,
    };

    history.forEach(({ price, historyContent, expenditureDay, category: { name: categoryName } }) => {
      if (!calendarData.dayData[expenditureDay])
        calendarData.dayData[expenditureDay] = {
          detail: [{ price, category: categoryName, historyContent }],
          dayTotalIncome: categoryName === 'income' ? price : 0,
          dayTotalExpenditure: categoryName === 'income' ? 0 : price,
        };
      else {
        calendarData.dayData[expenditureDay].detail.push({ price, category: categoryName, historyContent });

        categoryName === 'income'
          ? (calendarData.dayData[expenditureDay].dayTotalIncome += price)
          : (calendarData.dayData[expenditureDay].dayTotalExpenditure += price);
      }

      if (categoryName === 'income') calendarData.totalIncome += price;
      else calendarData.totalExpenditure += price;

      if (!calendarData.containCategory[categoryName]) calendarData.containCategory.push(categoryName);
    });

    return calendarData;
  }
}
